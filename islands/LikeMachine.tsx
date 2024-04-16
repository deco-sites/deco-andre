import { useEffect, useState } from "preact/hooks";
import { invoke } from "deco-sites/deco-andre/runtime.ts";
import { like_total_count } from "deco-sites/deco-andre/islands/LikeMachineTotal.tsx";

export interface Props {
  product_id: number;
}

export default function LikeMachine({ product_id }: Props) {
  const [local_likes, set_local_likes] = useState(0);
  const [is_liked, set_is_liked] = useState(false);

  useEffect(() => {
    invoke["deco-sites/deco-andre"].loaders.get_product_likes({
      product_id: product_id,
    }).then(
      ({ product_likes }) => {
        set_local_likes(product_likes);
      },
    );
  }, []);

  const handle_click = async () => {
    if (!is_liked) {
      const { success } = await invoke["deco-sites/deco-andre"].actions
        .camp_api_event({
          product_id: product_id,
        });

      if (success) {
        const { total_likes } = await invoke["deco-sites/deco-andre"].loaders
          .get_total_likes({});

        like_total_count.value = total_likes;

        set_local_likes((prev) => prev + 1);
        set_is_liked(true);
        globalThis.alert("Vote mais e ganhe prêmios!");
      }
    }
  };

  return (
    <>
      <button
        type="button"
        class="btn btn-outline h-full flex flex-col justify-center items-center gap-2 p-2 rounded-lg"
        onClick={handle_click}
      >
        {!is_liked
          ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-mood-smile"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
              <path d="M9 10l.01 0" />
              <path d="M15 10l.01 0" />
              <path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
            </svg>
          )
          : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-mood-check"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M20.925 13.163a8.998 8.998 0 0 0 -8.925 -10.163a9 9 0 0 0 0 18" />
              <path d="M9 10h.01" />
              <path d="M15 10h.01" />
              <path d="M9.5 15c.658 .64 1.56 1 2.5 1s1.842 -.36 2.5 -1" />
              <path d="M15 19l2 2l4 -4" />
            </svg>
          )}

        <p>{local_likes}</p>
      </button>
    </>
  );
}
