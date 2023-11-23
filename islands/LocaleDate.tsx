interface LocaleDateProps {
  date: string | number;
  method?: "toLocaleString" | "toLocaleDateString" | "toLocaleTimeString";
}

export default function LocaleDate({ date, method = "toLocaleString" }: LocaleDateProps) {
  const dateObj = new Date(date);
  return <>{dateObj[method]()}</>;
}
