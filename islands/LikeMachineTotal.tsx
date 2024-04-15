import { signal } from "@preact/signals";
import { useEffect } from "preact/hooks";

export interface Props {
  total_likes: number;
}

export const like_total_count = signal(0);

export default function LikeMachineTotal({ total_likes }: Props) {
  useEffect(() => {
    like_total_count.value = total_likes;
  }, []);

  return (
    <div class="flex items-center gap-2">
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
        class="icon icon-tabler icons-tabler-outline icon-tabler-friends"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M7 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        <path d="M5 22v-5l-1 -1v-4a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4l-1 1v5" />
        <path d="M17 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        <path d="M15 22v-4h-2l2 -6a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1l2 6h-2v4" />
      </svg>
      <p>{like_total_count.value}</p>
    </div>
  );
}
