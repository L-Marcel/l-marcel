import Slider from "rc-slider";
import { useFilter } from "../../context/hooks/useFilter";
import { usePagination } from "../../context/hooks/usePagination";

export function ProgressRange() {
  const { filter, changeProgressRange } = useFilter();
  const { firstPage } = usePagination();

  const { min, max } = filter.progress;

  function handleOnChangeInterval(interval: number | number[]) {
    if (Array.isArray(interval) && interval.length === 2) {
      changeProgressRange(interval[0], interval[1]);
      firstPage();
    }
  }

  return (
    <Slider
      range
      defaultValue={[min, max]}
      className="slider"
      onChange={handleOnChangeInterval}
      value={[min, max]}
      step={5}
      min={0}
      max={100}
      marks={{
        0: "0%",
        25: "25%",
        50: "50%",
        75: "75%",
        100: "100%",
      }}
    />
  );
}
