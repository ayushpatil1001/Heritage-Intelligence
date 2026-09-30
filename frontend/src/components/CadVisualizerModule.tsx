import React, { useState } from 'react';
import { GitBranch, Scale, Users, ArrowUpRight, BookOpenCheck } from 'lucide-react';
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
    <div className="space-y-8">
      {/* Interactive SVG Constitutional Graph Card */}
      <div className="bg-white border border-stone-300 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <h2 className="text-lg font-serif-archival font-bold text-zinc-900">
            Constitutional Article Evolution (CAD 1948–1949)
          </h2>
          <span className="text-xs text-zinc-500 font-medium">
            Click any node to view assembly debates and amendments
          </span>
        </div>

        <div className="rounded-2xl border border-stone-300 bg-stone-50/60 p-4 overflow-x-auto shadow-inner/none">
          <svg
            role="img"
            aria-label="Constituent Assembly Debates (CAD) Constitutional Article Provenance Graph"
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
                    stroke={isHighlighted ? '#1B2A4A' : '#d6d3d1'}
                    strokeWidth={isHighlighted ? 2.5 : 1.5}
                    strokeDasharray={isHighlighted ? 'none' : '4,4'}
                  />
                  <text
                    x={midX}
                    y={midY}
                    textAnchor="middle"
                    fill={isHighlighted ? '#1B2A4A' : '#78716c'}
                    fontSize="10"
                    fontWeight={isHighlighted ? 'bold' : 'normal'}
                    fontFamily="sans-serif"
                  >
                    {edge.relation.slice(0, 36)}...
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
                    strokeWidth={isSelected ? 2 : 1.5}
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

      {/* Selected Constitutional Article Dossier with Generous Grid Gap */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        <div className="lg:col-span-7 bg-white border border-stone-300 rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4">
            <div className="flex items-center gap-2.5">
              <Scale className="w-4 h-4 text-[#1B2A4A]" />
              <span className="text-xs font-bold text-[#1B2A4A] uppercase tracking-wide">
                {selectedNode.label} ({selectedNode.draftLabel}) • {selectedNode.cadVolume}
              </span>
            </div>
            <span className="text-xs text-zinc-500 font-medium">
              Debated: {selectedNode.date}
            </span>
          </div>

          <h3 className="text-xl font-bold text-zinc-900 font-serif-archival leading-snug">{selectedNode.title}</h3>

          <p className="text-sm sm:text-[14.5px] text-zinc-600 leading-relaxed">{selectedNode.summary}</p>

          <div className="p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] border-l-4 border-l-[#1B2A4A] border-y border-r border-stone-200 shadow-2xs space-y-2 my-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1B2A4A] block">
              Dr. B. R. Ambedkar’s Assembly Rejoinder:
            </span>
            <p className="text-sm sm:text-[14px] text-zinc-800 leading-relaxed font-serif-archival italic">{selectedNode.ambedkarRejoinder}</p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-stone-100">
            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-600">
              <Users className="w-3.5 h-3.5 text-zinc-500" />
              <span className="font-semibold text-zinc-700">Assembly Co-Debaters:</span>
              {selectedNode.coDebaters.map((debater, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-stone-100 text-zinc-800 font-medium border border-stone-200">
                  {debater}
                </span>
              ))}
            </div>

            <button
              onClick={() => onOpenArticleInRag(`${selectedNode.label} ${selectedNode.title}`)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#1B2A4A] hover:bg-[#142038] text-white cursor-pointer shadow-xs border border-[#1B2A4A] transition-colors"
            >
              <BookOpenCheck className="w-3.5 h-3.5" />
              <span>Verify in Manuscript</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Article Quick Selector List */}
        <div className="lg:col-span-5 bg-white border border-stone-300 rounded-2xl p-6 sm:p-7 shadow-xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-600 flex items-center gap-2 border-b border-stone-200 pb-3">
            <GitBranch className="w-4 h-4 text-[#1B2A4A]" />
            Constitutional Articles Index
          </h3>
          <div className="space-y-3">
            {EDGE_CAD_GRAPH.nodes.map((n) => {
              const active = n.id === selectedNode.id;
              return (
                <button
                  key={n.id}
                  onClick={() => setSelectedNode(n)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer ${
                    active
                      ? 'bg-[#1B2A4A] border-[#1B2A4A] text-white shadow-xs'
                      : 'bg-stone-50 border-stone-300 text-zinc-700 hover:bg-white hover:border-stone-400'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-bold ${active ? 'text-white' : 'text-[#1B2A4A]'}`}>
                      {n.label} ({n.draftLabel})
                    </span>
                    <span className={active ? 'text-slate-200' : 'text-zinc-500 font-medium'}>{n.cadVolume}</span>
                  </div>
                  <p className={`text-xs mt-1.5 leading-relaxed ${active ? 'text-slate-100' : 'text-zinc-600'}`}>{n.title}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
