import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@heroui/react"
import { FiCheckCircle, FiArrowRight, FiShield } from "react-icons/fi"
import { postFundingInfo } from '@/lib/actions/fundings'
import { revalidatePath } from 'next/cache'

export default async function SuccessPage({ searchParams }) {

    const { session_id } = await searchParams

    if (!session_id) redirect('/')

    let session;
    try {
        session = await stripe.checkout.sessions.retrieve(session_id, {
            expand: ['line_items', 'payment_intent']
        })
    } catch (err) {
        redirect('/')
    }

    const {
        status,
        customer_details: { email: email, name: name } = {},
        amount_total,
        currency
    } = session

    if (status === 'open') redirect('/')

    // Automatically save donation to your backend database
    if (status === 'complete') {
        try {
            await postFundingInfo(
                {
                    sessionId: session_id,
                    email: email || 'Anonymous',
                    name: name || 'Supporter',
                    amount: amount_total / 100,
                }
            )
            revalidatePath('/funding')
        } catch (e) {
            console.error("Failed to record donation:", e);
        }
    }

    const formattedAmount = amount_total
        ? new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency || 'BDT',
            maximumFractionDigits: 0
        }).format(amount_total / 100)
        : null

    return (
        <main className="mx-auto flex min-h-[80vh] w-full max-w-2xl items-center justify-center px-4 py-12">
            <div className="w-full overflow-hidden rounded-3xl border border-default-200/80 bg-content1 shadow-xl">
                <div className="px-6 py-10 text-center sm:px-10 bg-success-50/50">
                    <div className="mx-auto flex size-20 items-center justify-center rounded-3xl bg-success text-white shadow-lg">
                        <FiCheckCircle className="size-10" />
                    </div>
                    <h1 className="mt-4 text-3xl font-extrabold text-foreground">Thank You!</h1>
                    <p className="mt-2 text-sm text-default-500">Your contribution has been successfully processed.</p>
                </div>
                <div className="p-6 sm:p-10 text-center">
                    <p className="text-xl font-bold text-foreground">{formattedAmount}</p>
                    <p className="text-sm text-default-500 mt-1">Receipt sent to {email}</p>
                </div>
                <div className="flex w-full justify-center p-6 border-t border-default-200">
                    <Link href="/funding" className="w-full">
                        <Button color="danger" className="w-full">View All Contributions</Button>
                    </Link>
                </div>
            </div>
        </main>
    )
}