import React from "react";
import { cn } from "@/lib/utils";
import {
  Building,
  DollarSign,
  TrendingUp,
  Bell,
  Users,
  PieChart,
  Percent,
  MessageSquare,
  Settings,
  HelpCircle,
} from "lucide-react";

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  href,
  icon,
  label,
  active,
  badge,
}) => {
  return (
    <a
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <div className="flex-shrink-0">{icon}</div>
      <span className="flex-1">{label}</span>
      {badge !== undefined && (
        <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
          {badge}
        </span>
      )}
    </a>
  );
};

export function SimpleSidebar() {
  return (
    <div className="h-full bg-card border-r p-4 w-60">
      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-1">Capital Match</h3>
        <p className="text-xs text-muted-foreground">Property Intelligence</p>
      </div>
      
      <div className="space-y-1">
        <SidebarLink
          href="/"
          icon={<PieChart className="h-5 w-5" />}
          label="Dashboard"
        />
        <SidebarLink
          href="/investors"
          icon={<Users className="h-5 w-5" />}
          label="Investors"
        />
        <SidebarLink
          href="/properties"
          icon={<Building className="h-5 w-5" />}
          label="Properties"
        />
        <SidebarLink
          href="/deals"
          icon={<DollarSign className="h-5 w-5" />}
          label="Deals"
          badge={3}
        />
        <SidebarLink
          href="/analytics"
          icon={<Percent className="h-5 w-5" />}
          label="Analytics"
        />
        <SidebarLink
          href="/alerts"
          icon={<Bell className="h-5 w-5" />}
          label="Alerts"
          badge={5}
          active={true}
        />
        <SidebarLink
          href="/messages"
          icon={<MessageSquare className="h-5 w-5" />}
          label="Messages"
          badge={2}
        />
      </div>
      
      <div className="mt-auto pt-8 space-y-1">
        <SidebarLink
          href="/settings"
          icon={<Settings className="h-5 w-5" />}
          label="Settings"
        />
        <SidebarLink
          href="/help"
          icon={<HelpCircle className="h-5 w-5" />}
          label="Help"
        />
      </div>
    </div>
  );
}