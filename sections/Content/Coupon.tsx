import { scriptAsDataURI } from "apps/utils/dataURI.ts";
import { useId } from "../../sdk/useId.ts";

export interface Props {
  title: string;
  description?: string;
}

const copy_coupon = (id: string, title: string) => {
  const btn = document.querySelector(`li#${id} button`);

  if (btn) {
    btn.addEventListener("click", () => {
      navigator.clipboard.writeText(title).then(() => {
        const original_text = btn.textContent;
        btn.textContent = "Copiado";

        setTimeout(() => {
          btn.textContent = original_text;
        }, 3000);
      });
    });
  }
};

export default function Coupon({ title, description }: Props) {
  const id = useId();

  return (
    <li id={id} className="card w-96 bg-amber-100 shadow-xl rounded-xl">
      <div className="card-body">
        <p className="card-title">Use o cupom: {title}</p>
        {!!description && <p>{description}</p>}
        <div className="card-actions justify-end">
          <button className="btn btn-primary rounded-xl">
            Copiar
          </button>
        </div>
      </div>

      <script defer src={scriptAsDataURI(copy_coupon, id, title)} />
    </li>
  );
}
