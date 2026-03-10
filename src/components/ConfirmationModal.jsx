export function ConfirmationModal({ open, message, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <>
      <div className="fixed inset-0 z-[3000] bg-black/50" onClick={onCancel} aria-hidden />
      <div
        className="fixed left-1/2 top-1/2 z-[3001] w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl"
        role="alertdialog"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-desc"
      >
        <div className="mb-4 text-center text-3xl">⚠️</div>
        <h3 id="confirm-title" className="mb-2 text-lg font-semibold">Confirmar remoção</h3>
        <p id="confirm-desc" className="mb-6 text-gray-600">{message}</p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-xl border border-gray-300 py-2.5 font-medium transition hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-red-600 py-2.5 font-medium text-white transition hover:bg-red-700"
          >
            Remover
          </button>
        </div>
      </div>
    </>
  );
}
