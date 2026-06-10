"use client";

import { cn } from "@/lib/utils";
import {
  People,
  Lamp,
  Briefcase,
  Home2,
  Buildings2,
  Global,
  Map1,
  Location,
  Element3,
  Setting2,
  Logout,
  Notification,
  SearchNormal1,
  Clock,
  ArrowDown2,
  ArrowRight2,
  TrendUp,
  TrendDown,
  Minus,
  Setting4,
  MainComponent,
  DocumentText1,
  Weight,
  Wallet2,
  StatusUp,
  Layer,
  Chart2,
  Gps,
  Diagram,
  Shop,
  Camera,
  DocumentUpload,
  Gallery,
  TickCircle,
  CloseCircle,
  Maximize3,
  ArrowLeft2,
  Trash,
  Add,
  Warning2,
  Send2,
  Tree,
  Note1,
  MedalStar,
  ShieldTick,
  Woman,
  Profile2User,
  Book1,
  Hierarchy,
  Bag2,
  Building3,
  Judge,
  Refresh2,
  Star1,
  Call,
  Drop,
  Calendar,
  Profile,
  Personalcard,
  Ruler,
  Scan,
  UserTick,
} from "iconsax-react";
import type { ComponentType } from "react";

export type IconName =
  | "people"
  | "bulb"
  | "briefcase"
  | "home"
  | "business"
  | "globe"
  | "map"
  | "location"
  | "grid"
  | "settings"
  | "log-out"
  | "notifications"
  | "search"
  | "time"
  | "chevron-down"
  | "chevron-forward"
  | "trending-up"
  | "trending-down"
  | "remove"
  | "construct"
  | "hammer"
  | "document-text"
  | "scale"
  | "wallet"
  | "stats-chart"
  | "layers"
  | "bar-chart"
  | "pin"
  | "analytics"
  | "storefront"
  | "camera"
  | "document-upload"
  | "gallery"
  | "tick-circle"
  | "close-circle"
  | "maximize"
  | "arrow-left"
  | "trash"
  | "add"
  | "warning"
  | "send"
  | "tree"
  | "note"
  | "medal"
  | "shield-tick"
  | "woman"
  | "users"
  | "book"
  | "hierarchy"
  | "bag"
  | "building-3"
  | "judge"
  | "refresh"
  | "star"
  | "call"
  | "drop"
  | "calendar"
  | "profile"
  | "personal-card"
  | "ruler"
  | "scan"
  | "user-tick";

const iconMap: Record<IconName, ComponentType<any>> = {
  people: People,
  bulb: Lamp,
  briefcase: Briefcase,
  home: Home2,
  business: Buildings2,
  globe: Global,
  map: Map1,
  location: Location,
  grid: Element3,
  settings: Setting2,
  "log-out": Logout,
  notifications: Notification,
  search: SearchNormal1,
  time: Clock,
  "chevron-down": ArrowDown2,
  "chevron-forward": ArrowRight2,
  "trending-up": TrendUp,
  "trending-down": TrendDown,
  remove: Minus,
  construct: Setting4,
  hammer: MainComponent,
  "document-text": DocumentText1,
  scale: Weight,
  wallet: Wallet2,
  "stats-chart": StatusUp,
  layers: Layer,
  "bar-chart": Chart2,
  pin: Gps,
  analytics: Diagram,
  storefront: Shop,
  camera: Camera,
  "document-upload": DocumentUpload,
  gallery: Gallery,
  "tick-circle": TickCircle,
  "close-circle": CloseCircle,
  maximize: Maximize3,
  "arrow-left": ArrowLeft2,
  trash: Trash,
  add: Add,
  warning: Warning2,
  send: Send2,
  tree: Tree,
  note: Note1,
  medal: MedalStar,
  "shield-tick": ShieldTick,
  woman: Woman,
  users: Profile2User,
  book: Book1,
  hierarchy: Hierarchy,
  bag: Bag2,
  "building-3": Building3,
  judge: Judge,
  refresh: Refresh2,
  star: Star1,
  call: Call,
  drop: Drop,
  calendar: Calendar,
  profile: Profile,
  "personal-card": Personalcard,
  ruler: Ruler,
  scan: Scan,
  "user-tick": UserTick,
};

interface IconProps {
  name: IconName;
  className?: string;
  size?: number;
  style?: React.CSSProperties;
  variant?: "Linear" | "Bold" | "Outline" | "Bulk" | "Broken" | "TwoTone";
}

export function Icon({ name, className, size = 24, style, variant = "Linear" }: IconProps) {
  const Comp = iconMap[name];
  return (
    <Comp
      size={size}
      className={cn("shrink-0 [&>*]:!stroke-[1.8]", className)}
      variant={variant}
      color="currentColor"
      style={style}
    />
  );
}
