import { scriptAsDataURI } from "apps/utils/dataURI.ts";

export interface Props {
  title: string;
  description?: string;
}

const copy_coupon = (title: string) => {
  document.querySelectorAll(
    `button[data-coupon="${title}"][data-event="copy-clipboard"]`,
  ).forEach((btn) => {
    btn.addEventListener("click", () => {
      navigator.clipboard.writeText(title).then(() => {
        const original_text = btn.textContent;
        btn.textContent = "Copiado";

        setTimeout(() => {
          btn.textContent = original_text;
        }, 3000);
      });
    });
  });
};

export default function Coupon({ title, description }: Props) {
  return (
    <li className="card w-96 bg-amber-100 shadow-xl rounded-xl">
      <div className="card-body">
        <p className="card-title">Use o cupom: {title}</p>
        {!!description && <p>{description}</p>}
        <div className="card-actions justify-end">
          <button
            data-coupon={title}
            data-event="copy-clipboard"
            className="btn btn-primary rounded-xl"
          >
            Copiar
          </button>
        </div>
      </div>

      <script defer src={scriptAsDataURI(copy_coupon, title)} />
    </li>
  );
}
