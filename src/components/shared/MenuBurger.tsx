import { Menu } from "lucide-react";

export default function MenuBurger({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Menu color="white" />
    </div>
  );
}
