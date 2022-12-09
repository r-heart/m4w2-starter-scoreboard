// https://dev.to/themesberg/building-a-tailwind-css-toggleswitch-component-4pc3
export default function HomeAwaySwitch() {
  return (
    <label
      htmlFor="switch"
      className="switch relative flex cursor-pointer items-center"
    >
      <span className="mr-1 text-sm">Home</span>
      <input type="checkbox" id="switch" className="sr-only" />
      <span className="h-6 w-12 rounded-full bg-gray-800" />
      <span className="ml-1 text-sm">Away</span>
    </label>
  );
}
