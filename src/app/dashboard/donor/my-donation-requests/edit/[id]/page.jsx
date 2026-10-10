import { notFound } from "next/navigation";
import { getBloodDonationRequestById } from "@/lib/api/requests";
import RequestEditForm from "@/app/components/requests/RequestEditForm";

const RequestEditPage = async ({ params }) => {
    const { id } = await params;

    let requestData;

    try {
        requestData = await getBloodDonationRequestById(id);
    } catch (error) {
        console.error("Failed to load donation request:", error);
        notFound();
    }

    if (!requestData) {
        notFound();
    }

    return (
        <section className="mx-auto w-full max-w-4xl space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-foreground">
                    Edit Donation Request
                </h1>
                <p className="mt-1 text-sm text-default-500">
                    Update the information for your blood donation request.
                </p>
            </div>

            <RequestEditForm
                requestData={requestData}
                requestId={id}
            />
        </section>
    );


};

export default RequestEditPage;
