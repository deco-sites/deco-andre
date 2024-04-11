import type { Temperature } from "apps/weather/loaders/temperature.ts";

export interface Props {
  temperature: Temperature | null;
}

export default function ShowTemperature({ temperature }: Props) {
  return (
    <section className="w-full flex justify-center flex-col">
      {!!temperature && (
        <p className="text-center">
          Temperatura atual em Cuiabá: {temperature.celsius}°C
        </p>
      )}
    </section>
  );
}
