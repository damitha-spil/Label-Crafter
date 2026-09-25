import { Database } from 'lucide-react'
import { useLabelStore } from '../store/labelStore'
import { catalogForClient } from '../data/fieldCatalog'
import { SectionLabel } from './primitives'

export default function DataFieldsPanel() {
  const client = useLabelStore((s) => s.client)
  const fieldCatalog = useLabelStore((s) => s.fieldCatalog)
  const addBoundField = useLabelStore((s) => s.addBoundField)
  const setClient = useLabelStore((s) => s.setClient)
  const designSession = useLabelStore((s) => s.designSession)
  const fields = fieldCatalog?.length ? fieldCatalog : catalogForClient(client)

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden border-b border-[var(--lc-panel-border)] px-3 py-2">
      <div className="mb-1 flex items-center justify-between gap-2">
        <SectionLabel>Data fields</SectionLabel>
        <div className="flex gap-1">
          {['opti', 'erp'].map((id) => (
            <button
              key={id}
              type="button"
              disabled={!!designSession}
              onClick={() => setClient(id)}
              className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase ${
                client === id ? 'bg-[var(--lc-accent)] text-white' : 'text-[var(--lc-text-muted)]'
              }`}
            >
              {id}
            </button>
          ))}
        </div>
      </div>
      <p className="mb-1.5 truncate text-[10px] text-[var(--lc-text-muted)]" title="Click to place a bound field. Use Configure Data Mapping for noteN.fieldM.">
        Click a field to place it on the label
      </p>
      <div className="lc-data-fields-list min-h-0 flex-1 space-y-1 overflow-auto pr-1">
        {fields.map((field) => (
          <button
            key={field.key}
            type="button"
            onClick={() => addBoundField(field)}
            className="flex w-full items-center gap-2 rounded-md px-2 py-1 text-left hover:bg-[var(--lc-hover)]"
          >
            <Database size={12} className="shrink-0 text-[var(--lc-text-muted)]" />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[11px] font-semibold text-[var(--lc-text)]">{field.label || field.key}</span>
              <span className="block truncate font-mono text-[9px] text-[var(--lc-text-muted)]">{field.key}</span>
            </span>
            <span className="text-[9px] uppercase text-[var(--lc-text-muted)]">{field.type || 'text'}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
