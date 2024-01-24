import WorkerCreationModal from "../WorkerCreationModal";

export default function ModalRouter({ modal }: { modal: number }) {
  switch (modal) {
    default:
      return <WorkerCreationModal />;
  }
}
