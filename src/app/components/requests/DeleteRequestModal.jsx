
"use client";

import { Button, Modal } from "@heroui/react";

export default function DeleteRequestModal({
    request,
    onDelete,
    children,
}) {
    console.log(request._id)
    return (
        <Modal>
            {children}

            <Modal.Backdrop>
                <Modal.Container size="sm">
                    <Modal.Dialog>
                        <Modal.CloseTrigger />

                        <Modal.Header>
                            <Modal.Heading>
                                Delete Donation Request?
                            </Modal.Heading>
                        </Modal.Header>

                        <Modal.Body>
                            <p className="text-sm leading-6 text-slate-600">
                                Are you sure you want to delete this donation
                                request? This action cannot be undone.
                            </p>

                            <div className="mt-4 rounded-xl bg-slate-50 p-4">
                                <p className="font-medium text-slate-800">
                                    {request?.recipientName}
                                </p>

                                <p className="mt-1 text-sm text-slate-500">
                                    {request?.recipientDistrict},{" "}
                                    {request?.recipientUpazila}
                                </p>
                            </div>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button
                                slot="close"
                                variant="secondary"
                            >
                                Cancel
                            </Button>

                            <Button
                                color="danger"
                                slot="close"
                                onPress={() => onDelete(request._id)}
                            >
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}