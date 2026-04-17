"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Textarea,
  Select,
  Checkbox,
  Toggle,
  RadioGroup,
  Badge,
  Tag,
  Tooltip,
  Avatar,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Alert,
  Separator,
  Skeleton,
} from "@/components/appem";
import { Search, Mail, Eye, EyeOff, Plus, Trash2, Download } from "lucide-react";

function DemoSection({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="rounded-xl border border-ink-200 bg-white p-8 mb-8">
      <div className="mb-6">
        <span className="inline-block rounded-md bg-brand-50 px-2.5 py-1 font-mono text-xs text-brand-700 mb-3">
          {title}
        </span>
        <h2 className="font-display text-2xl text-ink-950">{title}</h2>
        <p className="mt-1 text-sm text-ink-500">{description}</p>
      </div>
      <div className="space-y-8">{children}</div>
    </section>
  );
}

function DemoBox({
  label,
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      {label && (
        <div className="mb-2 text-xs font-medium text-ink-400 uppercase tracking-wide">
          {label}
        </div>
      )}
      <div className="rounded-lg border border-ink-100 bg-ink-50/50 p-6">
        {children}
      </div>
    </div>
  );
}

function ButtonDemo() {
  const [loading, setLoading] = useState(false);

  const handleLoadingClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <DemoSection
      id="button"
      title="Button"
      description="Primary action component with multiple variants, sizes, and states."
    >
      <DemoBox label="Variants">
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </DemoBox>
      <DemoBox label="Sizes">
        <div className="flex items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </DemoBox>
      <DemoBox label="With Icons">
        <div className="flex flex-wrap gap-3">
          <Button leftIcon={<Plus className="h-4 w-4" />}>Add Item</Button>
          <Button variant="danger" leftIcon={<Trash2 className="h-4 w-4" />}>
            Delete
          </Button>
          <Button variant="outline" rightIcon={<Download className="h-4 w-4" />}>
            Export
          </Button>
        </div>
      </DemoBox>
      <DemoBox label="Loading & Arrow">
        <div className="flex gap-3">
          <Button loading={loading} onClick={handleLoadingClick}>
            {loading ? "Saving..." : "Click to Load"}
          </Button>
          <Button withArrow>Continue</Button>
          <Button disabled>Disabled</Button>
        </div>
      </DemoBox>
    </DemoSection>
  );
}

function InputDemo() {
  const [showPw, setShowPw] = useState(false);
  return (
    <DemoSection
      id="input"
      title="Input"
      description="Text input with labels, addons, error states, and size variants."
    >
      <DemoBox label="Sizes">
        <div className="max-w-md space-y-3">
          <Input inputSize="sm" placeholder="Small input" label="Small" />
          <Input inputSize="md" placeholder="Medium input" label="Medium" />
          <Input inputSize="lg" placeholder="Large input" label="Large" />
        </div>
      </DemoBox>
      <DemoBox label="With Addons">
        <div className="max-w-md space-y-3">
          <Input
            label="Search"
            placeholder="Search records..."
            leadingAddon={<Search className="h-4 w-4 text-ink-400" />}
          />
          <Input
            label="Email"
            placeholder="you@example.com"
            type="email"
            leadingAddon={<Mail className="h-4 w-4 text-ink-400" />}
          />
          <Input
            label="Password"
            type={showPw ? "text" : "password"}
            placeholder="Enter password"
            trailingAddon={
              <button onClick={() => setShowPw(!showPw)} className="text-ink-400 hover:text-ink-600">
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
          />
        </div>
      </DemoBox>
      <DemoBox label="States">
        <div className="max-w-md space-y-3">
          <Input label="Error State" error="This field is required" placeholder="Required field" required />
          <Input label="Disabled" disabled value="Cannot edit" />
        </div>
      </DemoBox>
    </DemoSection>
  );
}

function TextareaDemo() {
  const [val, setVal] = useState("");
  return (
    <DemoSection
      id="textarea"
      title="Textarea"
      description="Multi-line text input with auto-resize and character count."
    >
      <DemoBox label="Sizes">
        <div className="max-w-lg space-y-3">
          <Textarea textareaSize="sm" label="Small" placeholder="Small textarea..." />
          <Textarea textareaSize="md" label="Medium" placeholder="Medium textarea..." />
          <Textarea textareaSize="lg" label="Large" placeholder="Large textarea..." />
        </div>
      </DemoBox>
      <DemoBox label="Auto Resize & Character Count">
        <div className="max-w-lg">
          <Textarea
            label="Description"
            placeholder="Start typing — this textarea will grow..."
            autoResize
            maxLength={200}
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
        </div>
      </DemoBox>
      <DemoBox label="Error State">
        <div className="max-w-lg">
          <Textarea label="Notes" error="Too short — minimum 20 characters" placeholder="Enter notes..." />
        </div>
      </DemoBox>
    </DemoSection>
  );
}

function SelectDemo() {
  const [val, setVal] = useState("");
  const options = [
    { value: "admin", label: "Admin" },
    { value: "editor", label: "Editor" },
    { value: "viewer", label: "Viewer" },
    { value: "contributor", label: "Contributor" },
  ];

  return (
    <DemoSection
      id="select"
      title="Select"
      description="Dropdown select with optional search filtering."
    >
      <DemoBox label="Basic">
        <div className="max-w-sm">
          <Select
            label="Role"
            options={options}
            value={val}
            onValueChange={setVal}
            placeholder="Choose a role..."
          />
        </div>
      </DemoBox>
      <DemoBox label="Searchable">
        <div className="max-w-sm">
          <Select
            label="Country"
            searchable
            options={[
              { value: "us", label: "United States" },
              { value: "uk", label: "United Kingdom" },
              { value: "de", label: "Germany" },
              { value: "fr", label: "France" },
              { value: "jp", label: "Japan" },
              { value: "tw", label: "Taiwan" },
              { value: "kr", label: "South Korea" },
              { value: "au", label: "Australia" },
            ]}
            placeholder="Search countries..."
          />
        </div>
      </DemoBox>
      <DemoBox label="States">
        <div className="max-w-sm space-y-3">
          <Select label="Disabled" options={options} disabled />
          <Select label="With Error" options={options} error="Please select a role" required />
        </div>
      </DemoBox>
    </DemoSection>
  );
}

function CheckboxDemo() {
  const [checked, setChecked] = useState(false);
  const [items, setItems] = useState([true, false, true]);

  const allChecked = items.every(Boolean);
  const someChecked = items.some(Boolean) && !allChecked;

  return (
    <DemoSection
      id="checkbox"
      title="Checkbox"
      description="Checkbox with label and indeterminate state support."
    >
      <DemoBox label="Basic">
        <div className="space-y-3">
          <Checkbox label="Accept terms and conditions" checked={checked} onCheckedChange={(v) => setChecked(v as boolean)} />
          <Checkbox label="Subscribe to newsletter" />
          <Checkbox label="Disabled option" disabled />
        </div>
      </DemoBox>
      <DemoBox label="Indeterminate">
        <div className="space-y-3">
          <Checkbox
            label="Select all"
            checked={allChecked}
            indeterminate={someChecked}
            onCheckedChange={() => setItems(allChecked ? [false, false, false] : [true, true, true])}
          />
          <div className="ml-6 space-y-2">
            {["Read access", "Write access", "Delete access"].map((label, i) => (
              <Checkbox
                key={label}
                label={label}
                checked={items[i]}
                onCheckedChange={(v) => {
                  const next = [...items];
                  next[i] = v as boolean;
                  setItems(next);
                }}
              />
            ))}
          </div>
        </div>
      </DemoBox>
    </DemoSection>
  );
}

function ToggleDemo() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  return (
    <DemoSection
      id="toggle"
      title="Toggle"
      description="On/off switch with optional label positioning."
    >
      <DemoBox>
        <div className="space-y-4">
          <Toggle
            label="Enable notifications"
            checked={notifications}
            onCheckedChange={(v) => setNotifications(v as boolean)}
          />
          <Toggle
            label="Dark mode"
            checked={darkMode}
            onCheckedChange={(v) => setDarkMode(v as boolean)}
          />
          <Toggle label="Left-side label" labelPosition="left" />
          <Toggle label="Disabled" disabled />
        </div>
      </DemoBox>
    </DemoSection>
  );
}

function RadioGroupDemo() {
  const [plan, setPlan] = useState("pro");
  return (
    <DemoSection
      id="radio-group"
      title="RadioGroup"
      description="Radio button group with vertical and horizontal layouts."
    >
      <DemoBox label="Vertical (Default)">
        <RadioGroup
          label="Subscription Plan"
          value={plan}
          onValueChange={setPlan}
          options={[
            { value: "free", label: "Free" },
            { value: "pro", label: "Pro — $9/mo" },
            { value: "enterprise", label: "Enterprise — Contact us" },
          ]}
        />
      </DemoBox>
      <DemoBox label="Horizontal">
        <RadioGroup
          label="Priority"
          layout="horizontal"
          defaultValue="medium"
          options={[
            { value: "low", label: "Low" },
            { value: "medium", label: "Medium" },
            { value: "high", label: "High" },
          ]}
        />
      </DemoBox>
    </DemoSection>
  );
}

function BadgeDemo() {
  return (
    <DemoSection
      id="badge"
      title="Badge"
      description="Status indicators with color variants, sizes, and dot indicator."
    >
      <DemoBox label="Variants">
        <div className="flex flex-wrap gap-3">
          <Badge variant="brand">Brand</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="neutral">Neutral</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="warning">Warning</Badge>
        </div>
      </DemoBox>
      <DemoBox label="Sizes">
        <div className="flex items-center gap-3">
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge size="lg">Large</Badge>
        </div>
      </DemoBox>
      <DemoBox label="With Dot">
        <div className="flex flex-wrap gap-3">
          <Badge variant="success" dot>Active</Badge>
          <Badge variant="danger" dot>Offline</Badge>
          <Badge variant="warning" dot>Pending</Badge>
          <Badge variant="neutral" dot>Draft</Badge>
        </div>
      </DemoBox>
    </DemoSection>
  );
}

function TagDemo() {
  const [tags, setTags] = useState(["React", "TypeScript", "Tailwind", "Next.js"]);
  return (
    <DemoSection
      id="tag"
      title="Tag"
      description="Removable tags/chips with color variants."
    >
      <DemoBox label="Variants">
        <div className="flex gap-3">
          <Tag variant="blue">Blue Tag</Tag>
          <Tag variant="green">Green Tag</Tag>
          <Tag variant="mono">Mono Tag</Tag>
        </div>
      </DemoBox>
      <DemoBox label="Removable">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Tag key={tag} variant="blue" onRemove={() => setTags(tags.filter((t) => t !== tag))}>
              {tag}
            </Tag>
          ))}
          {tags.length === 0 && (
            <button
              className="text-sm text-brand-600 hover:text-brand-700"
              onClick={() => setTags(["React", "TypeScript", "Tailwind", "Next.js"])}
            >
              Reset tags
            </button>
          )}
        </div>
      </DemoBox>
    </DemoSection>
  );
}

function TooltipDemo() {
  return (
    <DemoSection
      id="tooltip"
      title="Tooltip"
      description="Informational popup on hover with 4 placement options."
    >
      <DemoBox>
        <div className="flex items-center justify-center gap-6 py-4">
          <Tooltip content="Tooltip on top" side="top">
            <Button variant="outline" size="sm">Top</Button>
          </Tooltip>
          <Tooltip content="Tooltip on bottom" side="bottom">
            <Button variant="outline" size="sm">Bottom</Button>
          </Tooltip>
          <Tooltip content="Tooltip on left" side="left">
            <Button variant="outline" size="sm">Left</Button>
          </Tooltip>
          <Tooltip content="Tooltip on right" side="right">
            <Button variant="outline" size="sm">Right</Button>
          </Tooltip>
        </div>
      </DemoBox>
    </DemoSection>
  );
}

function AvatarDemo() {
  return (
    <DemoSection
      id="avatar"
      title="Avatar"
      description="User avatar with image, initials fallback, and size variants."
    >
      <DemoBox label="Sizes">
        <div className="flex items-end gap-3">
          <Avatar size="xs" name="Sarah Chen" />
          <Avatar size="sm" name="Marcus Johnson" />
          <Avatar size="md" name="Aiko Tanaka" />
          <Avatar size="lg" name="David Park" />
          <Avatar size="xl" name="Elena Vasquez" />
        </div>
      </DemoBox>
      <DemoBox label="Initials Fallback & Anonymous">
        <div className="flex items-center gap-3">
          <Avatar name="Sarah Chen" />
          <Avatar name="Marcus Johnson" />
          <Avatar />
        </div>
      </DemoBox>
    </DemoSection>
  );
}

function CardDemo() {
  return (
    <DemoSection
      id="card"
      title="Card"
      description="Container component with elevation, border, and dark variants."
    >
      <DemoBox>
        <div className="grid gap-4 md:grid-cols-3">
          <Card variant="elevated">
            <CardHeader>
              <h3 className="font-medium text-ink-950">Elevated Card</h3>
            </CardHeader>
            <CardBody>
              <p className="text-sm text-ink-600">Default elevated card with shadow.</p>
            </CardBody>
            <CardFooter>
              <Button size="sm" variant="outline">Action</Button>
            </CardFooter>
          </Card>
          <Card variant="bordered">
            <CardHeader>
              <h3 className="font-medium text-ink-950">Bordered Card</h3>
            </CardHeader>
            <CardBody>
              <p className="text-sm text-ink-600">Flat card with border only.</p>
            </CardBody>
            <CardFooter>
              <Button size="sm" variant="outline">Action</Button>
            </CardFooter>
          </Card>
          <Card variant="dark">
            <CardHeader>
              <h3 className="font-medium text-white">Dark Card</h3>
            </CardHeader>
            <CardBody>
              <p className="text-sm text-ink-300">Dark theme variant.</p>
            </CardBody>
            <CardFooter>
              <Button size="sm" variant="secondary">Action</Button>
            </CardFooter>
          </Card>
        </div>
      </DemoBox>
    </DemoSection>
  );
}

function AlertDemo() {
  const [dismissed, setDismissed] = useState<Record<string, boolean>>({});
  return (
    <DemoSection
      id="alert"
      title="Alert"
      description="Contextual feedback messages with 4 semantic variants."
    >
      <DemoBox>
        <div className="space-y-3">
          <Alert variant="info" title="Info" description="This is an informational message." />
          <Alert variant="success" title="Success" description="Your changes have been saved." />
          <Alert variant="warning" title="Warning" description="This action cannot be undone." />
          <Alert variant="error" title="Error" description="Failed to connect to the server." />
        </div>
      </DemoBox>
      <DemoBox label="Dismissible">
        <div className="space-y-3">
          {!dismissed["d1"] && (
            <Alert
              variant="info"
              title="Dismissible Alert"
              description="Click the X to dismiss this alert."
              onDismiss={() => setDismissed({ ...dismissed, d1: true })}
            />
          )}
          {dismissed["d1"] && (
            <button
              className="text-sm text-brand-600 hover:text-brand-700"
              onClick={() => setDismissed({})}
            >
              Show alert again
            </button>
          )}
        </div>
      </DemoBox>
    </DemoSection>
  );
}

function SeparatorDemo() {
  return (
    <DemoSection
      id="separator"
      title="Separator"
      description="Horizontal or vertical divider with optional centered label."
    >
      <DemoBox label="Horizontal">
        <div className="space-y-4">
          <p className="text-sm text-ink-600">Content above separator</p>
          <Separator />
          <p className="text-sm text-ink-600">Content below separator</p>
        </div>
      </DemoBox>
      <DemoBox label="With Label">
        <div className="space-y-4">
          <p className="text-sm text-ink-600">Section A</p>
          <Separator label="OR" />
          <p className="text-sm text-ink-600">Section B</p>
        </div>
      </DemoBox>
      <DemoBox label="Vertical">
        <div className="flex items-center gap-4 h-12">
          <span className="text-sm text-ink-600">Left</span>
          <Separator orientation="vertical" />
          <span className="text-sm text-ink-600">Right</span>
        </div>
      </DemoBox>
    </DemoSection>
  );
}

function SkeletonDemo() {
  return (
    <DemoSection
      id="skeleton"
      title="Skeleton"
      description="Loading placeholder with rectangle, circle, and text variants."
    >
      <DemoBox>
        <div className="space-y-6">
          <div>
            <div className="text-xs font-medium text-ink-400 uppercase tracking-wide mb-2">Rectangle</div>
            <Skeleton variant="rectangle" width="100%" height={120} />
          </div>
          <div>
            <div className="text-xs font-medium text-ink-400 uppercase tracking-wide mb-2">Circle</div>
            <div className="flex gap-3">
              <Skeleton variant="circle" width={40} height={40} />
              <Skeleton variant="circle" width={48} height={48} />
              <Skeleton variant="circle" width={56} height={56} />
            </div>
          </div>
          <div>
            <div className="text-xs font-medium text-ink-400 uppercase tracking-wide mb-2">Text Lines</div>
            <Skeleton variant="text" lines={3} />
          </div>
        </div>
      </DemoBox>
    </DemoSection>
  );
}

export default function PrimitivesPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-display text-4xl text-ink-950">Primitives</h1>
      <p className="mt-3 text-ink-500 mb-12">
        15 foundational UI components — the building blocks of every APPEM interface.
      </p>

      <ButtonDemo />
      <InputDemo />
      <TextareaDemo />
      <SelectDemo />
      <CheckboxDemo />
      <ToggleDemo />
      <RadioGroupDemo />
      <BadgeDemo />
      <TagDemo />
      <TooltipDemo />
      <AvatarDemo />
      <CardDemo />
      <AlertDemo />
      <SeparatorDemo />
      <SkeletonDemo />
    </main>
  );
}
