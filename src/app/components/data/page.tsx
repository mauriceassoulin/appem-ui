"use client";

import { useState, useCallback } from "react";
import {
  DataTable,
  Pagination,
  SearchBar,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Dropdown,
  Breadcrumbs,
  FormFieldRenderer,
  Button,
  Badge,
  Avatar,
} from "@/components/appem";
import type { DataTableColumn } from "@/components/appem";
import { sampleUsers, sampleBreadcrumbs } from "@/lib/sample-data";
import { MoreHorizontal, Edit, Copy, Trash2, Archive, Mail, Download, Settings, User, Shield, LogOut } from "lucide-react";

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

function DataTableDemo() {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [sortKey, setSortKey] = useState("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const columns: DataTableColumn<(typeof sampleUsers)[0]>[] = [
    {
      key: "name",
      header: "Name",
      sortable: true,
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <Avatar size="xs" name={row.name} />
          <span className="font-medium text-ink-900">{row.name}</span>
        </div>
      ),
    },
    { key: "email", header: "Email", sortable: true },
    {
      key: "role",
      header: "Role",
      sortable: true,
      render: (val) => (
        <Badge variant={val === "Admin" ? "brand" : "neutral"} size="sm">
          {val as string}
        </Badge>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (val) => (
        <Badge
          variant={val === "Active" ? "success" : val === "Pending" ? "warning" : "neutral"}
          size="sm"
          dot
        >
          {val as string}
        </Badge>
      ),
    },
    { key: "department", header: "Department" },
  ];

  const sorted = [...sampleUsers].sort((a, b) => {
    const aVal = String(a[sortKey as keyof typeof a] ?? "");
    const bVal = String(b[sortKey as keyof typeof b] ?? "");
    return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
  });

  return (
    <DemoSection
      id="data-table"
      title="DataTable"
      description="Feature-rich data table with sorting, selection, loading, and empty states."
    >
      <DemoBox label="With Sorting & Selection">
        <DataTable
          columns={columns}
          data={sorted}
          selectable
          selectedRows={selected}
          onSelectionChange={setSelected}
          sortKey={sortKey}
          sortDirection={sortDir}
          onSort={(key, dir) => {
            setSortKey(key);
            setSortDir(dir);
          }}
        />
        {selected.size > 0 && (
          <div className="mt-3 text-sm text-ink-500">
            {selected.size} row(s) selected
          </div>
        )}
      </DemoBox>
      <DemoBox label="Loading State">
        <DataTable columns={columns} data={[]} loading />
      </DemoBox>
      <DemoBox label="Empty State">
        <DataTable columns={columns} data={[]} emptyMessage="No users found matching your criteria." />
      </DemoBox>
    </DemoSection>
  );
}

function PaginationDemo() {
  const [page, setPage] = useState(1);
  const [page2, setPage2] = useState(5);
  return (
    <DemoSection
      id="pagination"
      title="Pagination"
      description="Page navigation with smart ellipsis and boundary handling."
    >
      <DemoBox label="Basic (12 pages)">
        <Pagination currentPage={page} totalPages={12} onPageChange={setPage} />
        <div className="mt-2 text-sm text-ink-400">Current page: {page}</div>
      </DemoBox>
      <DemoBox label="Many Pages (50 pages)">
        <Pagination currentPage={page2} totalPages={50} onPageChange={setPage2} />
      </DemoBox>
      <DemoBox label="Small Size">
        <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} size="sm" />
      </DemoBox>
    </DemoSection>
  );
}

function SearchBarDemo() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  return (
    <DemoSection
      id="search-bar"
      title="SearchBar"
      description="Search input with debounced onChange, clear button, and loading state."
    >
      <DemoBox label="With Debounce">
        <div className="max-w-md">
          <SearchBar
            value={query}
            onChange={setQuery}
            onSubmit={setSubmitted}
            placeholder="Search users..."
            debounceMs={500}
          />
          <div className="mt-2 text-sm text-ink-400">
            Debounced value: &quot;{query}&quot;
            {submitted && <span className="ml-3">Submitted: &quot;{submitted}&quot;</span>}
          </div>
        </div>
      </DemoBox>
      <DemoBox label="Loading State">
        <div className="max-w-md">
          <SearchBar placeholder="Loading results..." loading />
        </div>
      </DemoBox>
    </DemoSection>
  );
}

function ModalDemo() {
  const [open, setOpen] = useState(false);
  const [openLg, setOpenLg] = useState(false);
  return (
    <DemoSection
      id="modal"
      title="Modal"
      description="Dialog overlay with configurable sizes and backdrop behavior."
    >
      <DemoBox label="Default Size (md)">
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal open={open} onOpenChange={setOpen}>
          <ModalHeader title="Edit Profile" description="Update your personal information." />
          <ModalBody>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink-700 mb-1">Name</label>
                <input
                  className="w-full rounded-lg border border-ink-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200"
                  defaultValue="Sarah Chen"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink-700 mb-1">Email</label>
                <input
                  className="w-full rounded-lg border border-ink-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200"
                  defaultValue="sarah.chen@appem.io"
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Save Changes</Button>
          </ModalFooter>
        </Modal>
      </DemoBox>
      <DemoBox label="Large Size">
        <Button variant="outline" onClick={() => setOpenLg(true)}>Open Large Modal</Button>
        <Modal open={openLg} onOpenChange={setOpenLg} maxWidth="lg">
          <ModalHeader title="Import Data" description="Upload a CSV or Excel file to import records." />
          <ModalBody>
            <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-ink-200 bg-ink-50 py-16">
              <div className="text-center">
                <Download className="mx-auto h-8 w-8 text-ink-300" />
                <p className="mt-2 text-sm text-ink-500">
                  Drag & drop a file here, or click to browse
                </p>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setOpenLg(false)}>Cancel</Button>
            <Button onClick={() => setOpenLg(false)}>Import</Button>
          </ModalFooter>
        </Modal>
      </DemoBox>
    </DemoSection>
  );
}

function DropdownDemo() {
  return (
    <DemoSection
      id="dropdown"
      title="Dropdown"
      description="Context menu with grouped items, icons, and danger actions."
    >
      <DemoBox label="Flat Items">
        <Dropdown
          trigger={<Button variant="outline" size="sm">Actions <MoreHorizontal className="ml-1 h-4 w-4" /></Button>}
          items={[
            { label: "Edit", icon: <Edit className="h-4 w-4" />, onSelect: () => {} },
            { label: "Duplicate", icon: <Copy className="h-4 w-4" />, onSelect: () => {} },
            { label: "Archive", icon: <Archive className="h-4 w-4" />, onSelect: () => {} },
            { label: "Delete", icon: <Trash2 className="h-4 w-4" />, variant: "danger", onSelect: () => {} },
          ]}
        />
      </DemoBox>
      <DemoBox label="Grouped Items">
        <Dropdown
          trigger={<Button variant="outline" size="sm"><User className="mr-1 h-4 w-4" /> Account</Button>}
          groups={[
            {
              label: "Account",
              items: [
                { label: "Profile", icon: <User className="h-4 w-4" />, onSelect: () => {} },
                { label: "Settings", icon: <Settings className="h-4 w-4" />, onSelect: () => {} },
                { label: "Security", icon: <Shield className="h-4 w-4" />, onSelect: () => {} },
              ],
            },
            {
              label: "Communication",
              items: [
                { label: "Send Email", icon: <Mail className="h-4 w-4" />, onSelect: () => {} },
              ],
            },
            {
              items: [
                { label: "Sign Out", icon: <LogOut className="h-4 w-4" />, variant: "danger", onSelect: () => {} },
              ],
            },
          ]}
        />
      </DemoBox>
    </DemoSection>
  );
}

function BreadcrumbsDemo() {
  return (
    <DemoSection
      id="breadcrumbs"
      title="Breadcrumbs"
      description="Navigation trail with truncation for deep hierarchies."
    >
      <DemoBox label="Default">
        <Breadcrumbs items={sampleBreadcrumbs} />
      </DemoBox>
      <DemoBox label="With Truncation (maxItems=3)">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Inventory", href: "/inventory" },
            { label: "Electronics", href: "/inventory/electronics" },
            { label: "Computers", href: "/inventory/electronics/computers" },
            { label: "Laptops", href: "/inventory/electronics/computers/laptops" },
            { label: "MacBook Pro 16" },
          ]}
          maxItems={3}
        />
      </DemoBox>
      <DemoBox label="Slash Separator">
        <Breadcrumbs items={sampleBreadcrumbs} separator="slash" />
      </DemoBox>
    </DemoSection>
  );
}

function FormFieldRendererDemo() {
  const [values, setValues] = useState<Record<string, unknown>>({
    text: "John Smith",
    number: 42,
    date: "2024-06-15",
    email: "john@appem.io",
    currency: 1250.00,
    select: "active",
    multiselect: ["react", "typescript"],
    checkbox: true,
    file: null,
    autogen: "REC-2024-00157",
  });

  const updateField = useCallback(
    (key: string) => (val: unknown) => setValues((prev) => ({ ...prev, [key]: val })),
    []
  );

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending" },
  ];

  const techOptions = [
    { value: "react", label: "React" },
    { value: "typescript", label: "TypeScript" },
    { value: "nextjs", label: "Next.js" },
    { value: "tailwind", label: "Tailwind CSS" },
    { value: "nodejs", label: "Node.js" },
  ];

  return (
    <DemoSection
      id="form-field-renderer"
      title="FormFieldRenderer"
      description="Dynamic field renderer supporting 28 field types. Showing 10 key types below."
    >
      <DemoBox label="Text & Email">
        <div className="grid gap-4 md:grid-cols-2 max-w-2xl">
          <FormFieldRenderer
            fieldType="text"
            label="Full Name"
            value={values.text}
            onChange={updateField("text")}
            required
          />
          <FormFieldRenderer
            fieldType="email"
            label="Email Address"
            value={values.email}
            onChange={updateField("email")}
          />
        </div>
      </DemoBox>
      <DemoBox label="Number & Currency">
        <div className="grid gap-4 md:grid-cols-2 max-w-2xl">
          <FormFieldRenderer
            fieldType="number"
            label="Quantity"
            value={values.number}
            onChange={updateField("number")}
          />
          <FormFieldRenderer
            fieldType="currency"
            label="Amount"
            value={values.currency}
            onChange={updateField("currency")}
            config={{ currencySymbol: "$" }}
          />
        </div>
      </DemoBox>
      <DemoBox label="Date">
        <div className="max-w-sm">
          <FormFieldRenderer
            fieldType="date"
            label="Start Date"
            value={values.date}
            onChange={updateField("date")}
          />
        </div>
      </DemoBox>
      <DemoBox label="Select & Multi-Select">
        <div className="grid gap-4 md:grid-cols-2 max-w-2xl">
          <FormFieldRenderer
            fieldType="select"
            label="Status"
            value={values.select}
            onChange={updateField("select")}
            options={statusOptions}
          />
          <FormFieldRenderer
            fieldType="multi-select"
            label="Technologies"
            value={values.multiselect}
            onChange={updateField("multiselect")}
            options={techOptions}
          />
        </div>
      </DemoBox>
      <DemoBox label="Checkbox">
        <FormFieldRenderer
          fieldType="checkbox"
          label="Active member"
          value={values.checkbox}
          onChange={updateField("checkbox")}
        />
      </DemoBox>
      <DemoBox label="File Upload">
        <div className="max-w-md">
          <FormFieldRenderer
            fieldType="file-upload"
            label="Attachments"
            value={values.file}
            onChange={updateField("file")}
            config={{ accept: ".pdf,.xlsx,.csv", maxFiles: 3 }}
          />
        </div>
      </DemoBox>
      <DemoBox label="Auto-Generated (Read Only)">
        <div className="max-w-sm">
          <FormFieldRenderer
            fieldType="auto-generated"
            label="Record ID"
            value={values.autogen}
            readOnly
          />
        </div>
      </DemoBox>
    </DemoSection>
  );
}

export default function DataComponentsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-display text-4xl text-ink-950">Data Components</h1>
      <p className="mt-3 text-ink-500 mb-12">
        7 components for displaying, searching, and managing structured data.
      </p>

      <DataTableDemo />
      <PaginationDemo />
      <SearchBarDemo />
      <ModalDemo />
      <DropdownDemo />
      <BreadcrumbsDemo />
      <FormFieldRendererDemo />
    </main>
  );
}
