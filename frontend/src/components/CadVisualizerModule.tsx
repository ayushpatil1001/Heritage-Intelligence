import React, { useState } from 'react';
import { GitBranch, Scale, Users, ArrowUpRight, Sparkles, BookOpenCheck } from 'lucide-react';
import { CadNode, EDGE_CAD_GRAPH } from '../data/edgeCorpus';

interface CadVisualizerModuleProps {
  onOpenArticleInRag: (query: string) => void;
}

export const CadVisualizerModule: React.FC<CadVisualizerModuleProps> = ({ onOpenArticleInRag }) => {
  const [selectedNode, setSelectedNode] = useState<CadNode>(EDGE_CAD_GRAPH.nodes[0]);

  const nodePositions: Record<string, { x: number; y: number }> = {
    'art-32': { x: 180, y: 150 },
    'art-14': { x: 430, y: 80 },
    'art-15': { x: 430, y: 220 },
    'art-17': { x: 680, y: 220 },
    'art-38': { x: 680, y: 80 },
    'art-rbi-finance': { x: 890, y: 150 }
  };

  return (
    <div className="space-y-5">
      <div className="stitch-card rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1B2A4A]">
              Constituent Assembly Proceedings (1946–1949)
            </span>
            <h2 className="text-xl font-bold text-zinc-900 font-serif-archival mt-0.5">
              Constitutional Article Provenance Graph &amp; Draft Evolution
            </h2>
          </div>
          <span className="text-xs font-medium px-3 py-1 rounded-lg bg-[#F8FAFC] text-[#1B2A4A] border border-[#1B2A4A]/15">
            Select any node to inspect proceedings
          </span>
        </div>

        {/* Interactive SVG Constitutional Graph in Clean Minimal Paper Canvas */}
        <div className="mt-4 rounded-xl border border-stone-200 bg-[#faf9f6] p-3 overflow-x-auto">
          <svg
            role="img"
            aria-label="Constituent Assembly Debates (CAD) Constitutional Article Provenance Graph showing Articles 32, 14, 15, 17, 38, and Reserve Bank Finance"
            viewBox="0 0 1060 300"
            className="w-full min-w-[780px] h-72 select-none"
          >
            {/* Edges */}
            {EDGE_CAD_GRAPH.edges.map((edge, idx) => {
              const p1 = nodePositions[edge.from];
              const p2 = nodePositions[edge.to];
              if (!p1 || !p2) return null;
              const isHighlighted = selectedNode.id === edge.from || selectedNode.id === edge.to;
              const midX = (p1.x + p2.x) / 2;
              const midY = (p1.y + p2.y) / 2 - 8;
              return (
                <g key={idx}>
                  <line
                    x1={p1.x}
                    y1={p1.y}
                    x2={p2.x}
                    y2={p2.y}
                    stroke={isHighlighted ? '#1B2A4A' : '#a8a29e'}
                    strokeWidth={isHighlighted ? 2.5 : 1.5}
                    strokeDasharray={isHighlighted ? 'none' : '5,4'}
                  />
                  <text
                    x={midX}
                    y={midY}
                    textAnchor="middle"
                    fill={isHighlighted ? '#1B2A4A' : '#78716c'}
                    fontSize="10"
                    fontWeight={isHighlighted ? 'bold' : 'normal'}
                    fontFamily="JetBrains Mono, monospace"
                  >
                    {edge.relation.slice(0, 34)}...
                  </text>
                </g>
              );
            })}

            {/* Nodes */}
            {EDGE_CAD_GRAPH.nodes.map((node) => {
              const pos = nodePositions[node.id] || { x: 100, y: 100 };
              const isSelected = selectedNode.id === node.id;
              return (
                <g
                  key={node.id}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  onClick={() => setSelectedNode(node)}
                  className="cursor-pointer"
                >
                  <rect
                    x={-88}
                    y={-34}
                    width={176}
                    height={68}
                    rx={12}
                    fill={isSelected ? '#1B2A4A' : '#FFFFFF'}
                    stroke={isSelected ? '#1B2A4A' : '#d6d3d1'}
                    strokeWidth={isSelected ? 2.5 : 1.5}
                  />
                  <text
                    x={0}
                    y={-10}
                    textAnchor="middle"
                    fill={isSelected ? '#FFFFFF' : '#1B2A4A'}
                    fontSize="13"
                    fontWeight="bold"
                  >
                    {node.label}
                  </text>
                  <text
                    x={0}
                    y={8}
                    textAnchor="middle"
                    fill={isSelected ? '#e2e8f0' : '#57534e'}
                    fontSize="10"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    ({node.draftLabel})
                  </text>
                  <text
                    x={0}
                    y={24}
                    textAnchor="middle"
                    fill={isSelected ? '#cbd5e1' : '#78716c'}
                    fontSize="9"
                  >
                    {node.date}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Selected Constitutional Article Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7 stitch-card rounded-2xl p-6 space-y-4 border-t-2 border-t-[#1B2A4A]">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-3">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-[#1B2A4A]" />
              <span className="text-xs font-mono-code font-bold uppercase text-[#1B2A4A]">
                {selectedNode.label} ← {selectedNode.draftLabel} ({selectedNode.cadVolume})
              </span>
            </div>
            <span className="text-xs font-mono-code font-medium px-2.5 py-0.5 rounded bg-[#faf9f6] text-zinc-600 border border-stone-200">
              {selectedNode.date}
            </span>
          </div>

          <h3 className="text-xl font-bold text-zinc-900 font-serif-archival">{selectedNode.title}</h3>

          <p className="text-sm text-zinc-600 leading-relaxed">{selectedNode.summary}</p>

          <div className="p-4 rounded-xl bg-[#F8FAFC] border-l-2 border-l-[#1B2A4A] border border-stone-200 space-y-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1B2A4A] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#1B2A4A]" /> Dr. B. R. Ambedkar’s Assembly Rejoinder:
            </span>
            <p className="text-sm text-zinc-900 font-medium leading-relaxed">{selectedNode.ambedkarRejoinder}</p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-600">
              <Users className="w-4 h-4 text-[#1B2A4A]" />
              <span className="font-semibold">Co-Debaters:</span>
              {selectedNode.coDebaters.map((debater, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-stone-100 text-zinc-800 border border-stone-200 font-mono-code">
                  {debater}
                </span>
              ))}
            </div>

            <button
              onClick={() => onOpenArticleInRag(`${selectedNode.label} ${selectedNode.title}`)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-[#1B2A4A] hover:bg-[#152238] text-white cursor-pointer"
            >
              <BookOpenCheck className="w-4 h-4" />
              <span>Inspect CAD Manuscript</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* All Constitutional Nodes Quick Selector */}
        <div className="lg:col-span-5 stitch-card rounded-2xl p-6 space-y-3">
          <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-[#1B2A4A]" />
            Constitutional Draft Evolution Index
          </h3>
          <div className="space-y-2">
            {EDGE_CAD_GRAPH.nodes.map((n) => {
              const active = n.id === selectedNode.id;
              return (
                <button
                  key={n.id}
                  onClick={() => setSelectedNode(n)}
                  className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                    active
                      ? 'bg-[#1B2A4A] border-[#1B2A4A] text-white'
                      : 'bg-[#faf9f6] border-stone-200 text-zinc-700 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono-code">
                    <span className={`font-bold ${active ? 'text-white' : 'text-[#1B2A4A]'}`}>
                      {n.label} ({n.draftLabel})
                    </span>
                    <span className={active ? 'text-slate-200' : 'text-zinc-500'}>{n.cadVolume}</span>
                  </div>
                  <p className={`text-xs font-medium mt-1 ${active ? 'text-slate-100' : 'text-zinc-600'}`}>{n.title}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
