"use client";

import { useState } from "react";
import {
  TabNav,
  FilterPanel,
  FormSection,
  SubtableEditor,
  RecordHero,
  EditModeBar,
  ActionDock,
  ListingPageSkeleton,
  FormPageSkeleton,
  DashboardSkeleton,
  Button,
  Badge,
  Input,
  Select,
  DataTable,
  Pagination,
  SearchBar,
  Card,
  CardBody,
} from "@/components/appem";
import type { DataTableColumn } from "@/components/appem";
import {
  sampleTabs,
  sampleFilters,
  sampleSubtableColumns,
  sampleSubtableRows,
  sampleSavedViews,
  sampleUsers,
  sampleProducts,
} from "@/lib/sample-data";
import { Plus, Download, Printer, Mail, FileText, Users, Package, DollarSign } from "lucide-react";

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
  noPad,
}: {
  label?: string;
  children: React.ReactNode;
  noPad?: boolean;
}) {
  return (
    <div>
      {label && (
        <div className="mb-2 text-xs font-medium text-ink-400 uppercase tracking-wide">
          {label}
        </div>
      )}
      <div className={`rounded-lg border border-ink-100 bg-ink-50/50 ${noPad ? "" : "p-6"} overflow-hidden`}>
        {children}
      </div>
    </div>
  );
}

function TabNavDemo() {
  const [activeTab, setActiveTab] = useState("all");
  return (
    <DemoSection
      id="tab-nav"
      title="TabNav"
      description="Tab navigation with colored indicators, icons, and badge counts."
    >
      <DemoBox label="With Colors & Badges">
        <TabNav tabs={sampleTabs} activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="mt-4 text-sm text-ink-500">
          Active tab: <span className="font-mono text-ink-700">{activeTab}</span>
        </div>
      </DemoBox>
      <DemoBox label="Simple Tabs">
        <TabNav
          tabs={[
            { key: "overview", label: "Overview" },
            { key: "details", label: "Details" },
            { key: "history", label: "History" },
          ]}
          activeTab="overview"
          onTabChange={() => {}}
        />
      </DemoBox>
    </DemoSection>
  );
}

function FilterPanelDemo() {
  const [filters, setFilters] = useState<Record<string, unknown>>({});
  return (
    <DemoSection
      id="filter-panel"
      title="FilterPanel"
      description="Advanced filter panel with various input types and saved views."
    >
      <DemoBox>
        <FilterPanel
          filters={sampleFilters}
          activeFilters={filters}
          onFilterChange={(key, val) => setFilters((prev) => ({ ...prev, [key]: val }))}
          savedViews={sampleSavedViews}
          onSavedViewSelect={() => {}}
          onClearAll={() => setFilters({})}
        />
        {Object.keys(filters).length > 0 && (
          <div className="mt-4 rounded-md bg-ink-100 p-3">
            <div className="text-xs font-mono text-ink-600">
              Active filters: {JSON.stringify(filters, null, 2)}
            </div>
          </div>
        )}
      </DemoBox>
    </DemoSection>
  );
}

function FormSectionDemo() {
  return (
    <DemoSection
      id="form-section"
      title="FormSection"
      description="Collapsible form section with title, description, and icon."
    >
      <DemoBox label="Default (Open)">
        <FormSection title="Personal Information" description="Basic contact details for this record.">
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="First Name" placeholder="John" />
            <Input label="Last Name" placeholder="Smith" />
            <Input label="Email" placeholder="john@example.com" type="email" />
            <Input label="Phone" placeholder="+1 (555) 000-0000" />
          </div>
        </FormSection>
      </DemoBox>
      <DemoBox label="Collapsible">
        <div className="space-y-4">
          <FormSection
            title="Billing Details"
            description="Payment and invoice settings."
            collapsible
            defaultOpen
            icon={<DollarSign className="h-4 w-4" />}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="Company Name" placeholder="Acme Inc." />
              <Select
                label="Currency"
                options={[
                  { value: "usd", label: "USD ($)" },
                  { value: "eur", label: "EUR (€)" },
                  { value: "gbp", label: "GBP (£)" },
                ]}
              />
            </div>
          </FormSection>
          <FormSection
            title="Shipping Address"
            collapsible
            defaultOpen={false}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="Street" placeholder="123 Main St" />
              <Input label="City" placeholder="San Francisco" />
            </div>
          </FormSection>
        </div>
      </DemoBox>
    </DemoSection>
  );
}

function SubtableEditorDemo() {
  const [rows, setRows] = useState<Record<string, unknown>[]>(sampleSubtableRows);
  return (
    <DemoSection
      id="subtable-editor"
      title="SubtableEditor"
      description="Inline editable table for line items, with add/delete and summary row."
    >
      <DemoBox label="Editable">
        <SubtableEditor
          title="Line Items"
          badge="3 items"
          columns={sampleSubtableColumns}
          rows={rows}
          onRowChange={(idx, row) => {
            const next = [...rows];
            next[idx] = row;
            setRows(next);
          }}
          onRowDelete={(idx) => setRows(rows.filter((_, i) => i !== idx))}
          onRowAdd={(row) => setRows([...rows, row])}
          summary={{ total: "$239.95" }}
        />
      </DemoBox>
      <DemoBox label="Read Only">
        <SubtableEditor
          title="Order Summary"
          columns={sampleSubtableColumns}
          rows={sampleSubtableRows}
          readOnly
          summary={{ total: "$239.95" }}
        />
      </DemoBox>
    </DemoSection>
  );
}

function RecordHeroDemo() {
  return (
    <DemoSection
      id="record-hero"
      title="RecordHero"
      description="Page header with breadcrumbs, image, badges, and action buttons."
    >
      <DemoBox noPad>
        <RecordHero
          title="Wireless Keyboard Pro"
          subtitle="SKU: WKB-PRO-001 · Electronics"
          breadcrumbs={[
            { label: "Products", href: "/products" },
            { label: "Electronics", href: "/products/electronics" },
            { label: "Wireless Keyboard Pro" },
          ]}
          badges={
            <div className="flex gap-2">
              <Badge variant="success" dot>In Stock</Badge>
              <Badge variant="brand">Featured</Badge>
            </div>
          }
          actions={
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Edit</Button>
              <Button size="sm">View Orders</Button>
            </div>
          }
        />
      </DemoBox>
    </DemoSection>
  );
}

function EditModeBarDemo() {
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(true);
  return (
    <DemoSection
      id="edit-mode-bar"
      title="EditModeBar"
      description="Sticky bar for form editing with save/cancel and auto-save indicator."
    >
      <DemoBox>
        <div className="relative">
          <EditModeBar
            onSave={() => {
              setSaving(true);
              setTimeout(() => {
                setSaving(false);
                setDirty(false);
              }, 1500);
            }}
            onCancel={() => setDirty(false)}
            saving={saving}
            dirty={dirty}
            lastSaved={new Date(Date.now() - 120000)}
          />
          {!dirty && (
            <button
              className="mt-3 text-sm text-brand-600 hover:text-brand-700"
              onClick={() => setDirty(true)}
            >
              Make changes (mark as dirty)
            </button>
          )}
        </div>
      </DemoBox>
    </DemoSection>
  );
}

function ActionDockDemo() {
  return (
    <DemoSection
      id="action-dock"
      title="ActionDock"
      description="Floating action button with expandable menu."
    >
      <DemoBox>
        <div className="relative h-48">
          <p className="text-sm text-ink-500">
            The ActionDock renders as a fixed floating button. Below is a preview of its actions.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              { icon: <Plus className="h-4 w-4" />, label: "New Record" },
              { icon: <Download className="h-4 w-4" />, label: "Export" },
              { icon: <Printer className="h-4 w-4" />, label: "Print" },
              { icon: <Mail className="h-4 w-4" />, label: "Send Email" },
            ].map((a) => (
              <Button key={a.label} variant="outline" size="sm" leftIcon={a.icon}>
                {a.label}
              </Button>
            ))}
          </div>
          <ActionDock
            actions={[
              { key: "new", icon: <Plus className="h-5 w-5" />, label: "New Record", onClick: () => {} },
              { key: "export", icon: <Download className="h-5 w-5" />, label: "Export", onClick: () => {} },
              { key: "print", icon: <Printer className="h-5 w-5" />, label: "Print", onClick: () => {} },
              { key: "email", icon: <Mail className="h-5 w-5" />, label: "Send Email", onClick: () => {} },
            ]}
            position="bottom-right"
          />
        </div>
      </DemoBox>
    </DemoSection>
  );
}

function ListingPageSkeletonDemo() {
  const [activeTab, setActiveTab] = useState("all");
  const [page, setPage] = useState(1);

  const columns: DataTableColumn<(typeof sampleProducts)[0]>[] = [
    { key: "name", header: "Product", sortable: true },
    { key: "sku", header: "SKU" },
    { key: "category", header: "Category", sortable: true },
    {
      key: "price",
      header: "Price",
      sortable: true,
      render: (val) => <span className="font-mono">${(val as number).toFixed(2)}</span>,
    },
    {
      key: "stock",
      header: "Stock",
      render: (val) => (
        <Badge variant={(val as number) > 0 ? "success" : "danger"} size="sm">
          {(val as number) > 0 ? `${val} units` : "Out of stock"}
        </Badge>
      ),
    },
  ];

  return (
    <DemoSection
      id="listing-page-skeleton"
      title="ListingPageSkeleton"
      description="Full page layout for list/table views with tabs, toolbar, filters, and pagination."
    >
      <DemoBox label="Full Layout Preview" noPad>
        <div className="h-[600px] overflow-auto">
          <ListingPageSkeleton
            tabs={
              <TabNav
                tabs={sampleTabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
            }
            toolbar={
              <div className="flex items-center justify-between gap-4">
                <SearchBar placeholder="Search products..." onChange={() => {}} />
                <Button leftIcon={<Plus className="h-4 w-4" />}>Add Product</Button>
              </div>
            }
            filters={
              <FilterPanel
                filters={sampleFilters.slice(0, 2)}
                activeFilters={{}}
                onFilterChange={() => {}}
              />
            }
            pagination={
              <Pagination currentPage={page} totalPages={8} onPageChange={setPage} size="sm" />
            }
          >
            <DataTable columns={columns} data={sampleProducts} />
          </ListingPageSkeleton>
        </div>
      </DemoBox>
    </DemoSection>
  );
}

function FormPageSkeletonDemo() {
  return (
    <DemoSection
      id="form-page-skeleton"
      title="FormPageSkeleton"
      description="Full page layout for record detail/form views with hero, edit bar, and sidebar."
    >
      <DemoBox label="Full Layout Preview" noPad>
        <div className="h-[500px] overflow-auto">
          <FormPageSkeleton
            hero={
              <RecordHero
                title="Sarah Chen"
                subtitle="Admin · Engineering"
                badges={<Badge variant="success" dot>Active</Badge>}
                actions={<Button size="sm" variant="outline">Edit</Button>}
                breadcrumbs={[
                  { label: "Users", href: "/users" },
                  { label: "Sarah Chen" },
                ]}
              />
            }
            editBar={
              <EditModeBar
                onSave={() => {}}
                onCancel={() => {}}
                dirty={false}
                lastSaved={new Date()}
              />
            }
            sidebar={
              <div className="space-y-4">
                <Card variant="bordered">
                  <CardBody>
                    <h3 className="text-sm font-medium text-ink-700 mb-3">Quick Info</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-ink-400">Role</span>
                        <span className="text-ink-700">Admin</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ink-400">Joined</span>
                        <span className="text-ink-700">Jan 15, 2024</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ink-400">Records</span>
                        <span className="text-ink-700">47</span>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            }
          >
            <FormSection title="Personal Information">
              <div className="grid gap-4 md:grid-cols-2">
                <Input label="First Name" defaultValue="Sarah" />
                <Input label="Last Name" defaultValue="Chen" />
                <Input label="Email" defaultValue="sarah.chen@appem.io" />
                <Input label="Phone" defaultValue="+1 (555) 012-3456" />
              </div>
            </FormSection>
          </FormPageSkeleton>
        </div>
      </DemoBox>
    </DemoSection>
  );
}

function DashboardSkeletonDemo() {
  return (
    <DemoSection
      id="dashboard-skeleton"
      title="DashboardSkeleton"
      description="Dashboard layout with stat cards, charts area, and table section."
    >
      <DemoBox label="Full Layout Preview" noPad>
        <div className="h-[500px] overflow-auto">
          <DashboardSkeleton
            header={
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-2xl text-ink-950">Dashboard</h2>
                  <p className="text-sm text-ink-500">Overview of your workspace</p>
                </div>
                <Button variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
                  Export Report
                </Button>
              </div>
            }
            stats={
              <>
                {[
                  { label: "Total Users", value: "2,847", icon: <Users className="h-5 w-5 text-brand-500" />, change: "+12%" },
                  { label: "Products", value: "384", icon: <Package className="h-5 w-5 text-accent-warm" />, change: "+5%" },
                  { label: "Revenue", value: "$48.2K", icon: <DollarSign className="h-5 w-5 text-green-500" />, change: "+18%" },
                  { label: "Reports", value: "156", icon: <FileText className="h-5 w-5 text-purple-500" />, change: "+3%" },
                ].map((stat) => (
                  <Card key={stat.label} variant="bordered" padding="compact">
                    <CardBody>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-ink-500">{stat.label}</div>
                          <div className="mt-1 font-mono text-2xl font-medium text-ink-950">
                            {stat.value}
                          </div>
                        </div>
                        <div className="rounded-lg bg-ink-50 p-2.5">{stat.icon}</div>
                      </div>
                      <div className="mt-2 text-xs text-green-600 font-medium">
                        {stat.change} from last month
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </>
            }
            charts={
              <>
                <Card variant="bordered">
                  <CardBody>
                    <h3 className="font-medium text-ink-700 mb-4">Revenue Trend</h3>
                    <div className="flex h-40 items-end gap-2">
                      {[40, 55, 35, 70, 60, 80, 65, 90, 75, 95, 85, 100].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t-md bg-brand-200 hover:bg-brand-400 transition-colors"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-ink-400">
                      <span>Jan</span><span>Jun</span><span>Dec</span>
                    </div>
                  </CardBody>
                </Card>
                <Card variant="bordered">
                  <CardBody>
                    <h3 className="font-medium text-ink-700 mb-4">Top Categories</h3>
                    <div className="space-y-3">
                      {[
                        { name: "Electronics", pct: 42 },
                        { name: "Accessories", pct: 28 },
                        { name: "Furniture", pct: 18 },
                        { name: "Software", pct: 12 },
                      ].map((cat) => (
                        <div key={cat.name}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-ink-700">{cat.name}</span>
                            <span className="text-ink-400">{cat.pct}%</span>
                          </div>
                          <div className="h-2 rounded-full bg-ink-100">
                            <div
                              className="h-full rounded-full bg-brand-400"
                              style={{ width: `${cat.pct}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </>
            }
            tables={
              <Card variant="bordered">
                <CardBody>
                  <h3 className="font-medium text-ink-700 mb-4">Recent Users</h3>
                  <DataTable
                    columns={[
                      { key: "name", header: "Name" },
                      { key: "email", header: "Email" },
                      { key: "role", header: "Role" },
                      {
                        key: "status",
                        header: "Status",
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
                    ]}
                    data={sampleUsers.slice(0, 4)}
                  />
                </CardBody>
              </Card>
            }
          />
        </div>
      </DemoBox>
    </DemoSection>
  );
}

export default function BlocksPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-display text-4xl text-ink-950">Blocks &amp; Layouts</h1>
      <p className="mt-3 text-ink-500 mb-12">
        10 pre-composed blocks and page skeletons for building complete views.
      </p>

      <TabNavDemo />
      <FilterPanelDemo />
      <FormSectionDemo />
      <SubtableEditorDemo />
      <RecordHeroDemo />
      <EditModeBarDemo />
      <ActionDockDemo />
      <ListingPageSkeletonDemo />
      <FormPageSkeletonDemo />
      <DashboardSkeletonDemo />
    </main>
  );
}
