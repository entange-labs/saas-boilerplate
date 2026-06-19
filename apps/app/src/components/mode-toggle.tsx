import { Button } from "@saas-boilerplate/ui/components/button";
import { ButtonGroup } from "@saas-boilerplate/ui/components/button-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@saas-boilerplate/ui/components/tooltip";
import { cn } from "@saas-boilerplate/ui/lib/utils";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

const themeOptions = [
  {
    icon: SunIcon,
    label: "Light",
    value: "light",
  },
  {
    icon: MoonIcon,
    label: "Dark",
    value: "dark",
  },
  {
    icon: MonitorIcon,
    label: "System",
    value: "system",
  },
] as const;

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <ButtonGroup aria-label="Theme mode">
      {themeOptions.map((option) => {
        const Icon = option.icon;
        const isSelected = theme === option.value;

        return (
          <Tooltip key={option.value}>
            <TooltipTrigger
              render={
                <Button
                  aria-label={`${option.label} theme`}
                  aria-pressed={isSelected}
                  className={cn(isSelected && "border-border!")}
                  size="icon-sm"
                  type="button"
                  variant={isSelected ? "default" : "outline"}
                  onClick={() => setTheme(option.value)}
                />
              }
            >
              <Icon aria-hidden="true" />
            </TooltipTrigger>
            <TooltipContent>{option.label} theme</TooltipContent>
          </Tooltip>
        );
      })}
    </ButtonGroup>
  );
}
