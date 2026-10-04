"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { Network, Search, Filter, ZoomIn, ZoomOut, RefreshCw, ArrowRight, Share2, Info } from "lucide-react";

interface GraphNode {
  id: string;
  name: string;
  type: "person" | "place" | "concept" | "legislation" | "organization" | "work";
  mentions_count?: number;
  x?: number;
  y?: number;
}

interface GraphEdge {
  source: string;
  target: string;
  relation_type: string;
  label?: string;
}

const DEFAULT_NODES: GraphNode[] = [
  { id: "e1", name: "Dr. B. R. Ambedkar", type: "person", mentions_count: 50 },
  { id: "e2", name: "Mahad Satyagraha", type: "place", mentions_count: 24 },
  { id: "e3", name: "Chavdar Tale", type: "place", mentions_count: 18 },
  { id: "e4", name: "Constitution of India", type: "legislation", mentions_count: 42 },
  { id: "e5", name: "Castes in India", type: "work", mentions_count: 20 },
  { id: "e6", name: "Annihilation of Caste", type: "work", mentions_count: 35 },
  { id: "e7", name: "The Problem of the Rupee", type: "work", mentions_count: 15 },
  { id: "e8", name: "Columbia University", type: "organization", mentions_count: 14 },
  { id: "e9", name: "John Dewey", type: "person", mentions_count: 12 },
  { id: "e10", name: "London School of Economics", type: "organization", mentions_count: 15 },
  { id: "e11", name: "Edwin Cannan", type: "person", mentions_count: 8 },
  { id: "e12", name: "Dhammadeeksha Nagpur", type: "concept", mentions_count: 28 },
  { id: "e13", name: "Hindu Code Bill", type: "legislation", mentions_count: 22 },
  { id: "e14", name: "Constituent Assembly", type: "organization", mentions_count: 38 },
  { id: "e15", name: "Poona Pact (1932)", type: "legislation", mentions_count: 26 },
  { id: "e16", name: "M. K. Gandhi", type: "person", mentions_count: 20 },
  { id: "e17", name: "Bahishkrit Hitakarini Sabha", type: "organization", mentions_count: 19 },
  { id: "e18", name: "Mooknayak", type: "work", mentions_count: 17 },
  { id: "e19", name: "Bahishkrit Bharat", type: "work", mentions_count: 16 },
  { id: "e20", name: "Jat-Pat Todak Mandal", type: "organization", mentions_count: 11 },
];

const DEFAULT_EDGES: GraphEdge[] = [
  { source: "e1", target: "e4", relation_type: "drafted_and_defended" },
  { source: "e1", target: "e5", relation_type: "authored" },
  { source: "e1", target: "e6", relation_type: "authored" },
  { source: "e1", target: "e7", relation_type: "authored" },
  { source: "e1", target: "e2", relation_type: "led_satyagraha" },
  { source: "e2", target: "e3", relation_type: "occurred_at" },
  { source: "e1", target: "e8", relation_type: "studied_at" },
  { source: "e8", target: "e9", relation_type: "mentored_by" },
  { source: "e1", target: "e10", relation_type: "studied_at" },
  { source: "e10", target: "e11", relation_type: "mentored_by" },
  { source: "e1", target: "e12", relation_type: "initiated_deeksha" },
  { source: "e1", target: "e13", relation_type: "introduced_bill" },
  { source: "e4", target: "e14", relation_type: "debated_in" },
  { source: "e1", target: "e14", relation_type: "chaired_drafting_comm" },
  { source: "e1", target: "e15", relation_type: "negotiated" },
  { source: "e15", target: "e16", relation_type: "co_signatory" },
  { source: "e1", target: "e17", relation_type: "founded" },
  { source: "e1", target: "e18", relation_type: "founded_journal" },
  { source: "e1", target: "e19", relation_type: "founded_journal" },
  { source: "e6", target: "e20", relation_type: "prepared_speech_for" },
];

export default function GraphClient() {
  const { language, t } = useApp();
  const [nodes, setNodes] = useState<GraphNode[]>(DEFAULT_NODES);
  const [edges, setEdges] = useState<GraphEdge[]>(DEFAULT_EDGES);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(DEFAULT_NODES[0]);
  const [filterType, setFilterType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Fetch live graph from FastAPI backend if available
  useEffect(() => {
    fetch("/api/v1/graph")
      .then((res) => {
        if (!res.ok) throw new Error("Backend offline");
        return res.json();
      })
      .then((data) => {
        if (data.nodes && data.nodes.length > 0) {
          setNodes(data.nodes);
          setEdges(data.edges || []);
          setSelectedNode(data.nodes[0]);
        }
      })
      .catch(() => {
        // Fall back to comprehensive default graph
      });
  }, []);

  // Compute 2D node layout positions deterministically
  const positionedNodes = useMemo(() => {
    const total = nodes.length;
    return nodes.map((node, i) => {
      if (node.id === "e1" || node.name.includes("Dr. B. R. Ambedkar")) {
        return { ...node, x: 450, y: 320 }; // Center Dr. Ambedkar
      }
      // Distribute in two rings
      const ring = i % 2 === 0 ? 190 : 290;
      const angle = (i / total) * 2 * Math.PI;
      const x = 450 + Math.cos(angle) * ring;
      const y = 320 + Math.sin(angle) * ring;
      return { ...node, x, y };
    });
  }, [nodes]);

  const filteredNodes = useMemo(() => {
    return positionedNodes.filter((node) => {
      if (filterType !== "all" && node.type !== filterType) return false;
      if (searchQuery && !node.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [positionedNodes, filterType, searchQuery]);

  // Compute connections for selected node
  const connectedEdges = useMemo(() => {
    if (!selectedNode) return [];
    return edges.filter((e) => e.source === selectedNode.id || e.target === selectedNode.id);
  }, [selectedNode, edges]);

  const connectedNodes = useMemo(() => {
    if (!selectedNode) return [];
    const connectedIds = new Set(
      connectedEdges.flatMap((e) => [e.source, e.target]).filter((id) => id !== selectedNode.id)
    );
    return positionedNodes.filter((n) => connectedIds.has(n.id));
  }, [selectedNode, connectedEdges, positionedNodes]);

  const getNodeColor = (type: string) => {
    switch (type) {
      case "person":
        return "#0B2A6F"; // Navy
      case "work":
        return "#C8A24A"; // Gold
      case "legislation":
        return "#15803D"; // Green
      case "organization":
        return "#4338CA"; // Indigo
      case "place":
        return "#B91C1C"; // Crimson
      case "concept":
        return "#D97706"; // Amber
      default:
        return "#475569";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-navy-900/10 pb-5">
        <div>
          <div className="flex items-center gap-2 text-sm text-gold-600 font-semibold tracking-wide uppercase">
            <Network className="w-4 h-4" />
            <span>Interactive Knowledge Graph</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-navy-900 mt-1">
            {language === "mr"
              ? "ज्ञान संबंध जाळे (Knowledge Graph)"
              : language === "hi"
              ? "ज्ञान संबंध संजाल (Knowledge Graph)"
              : "Semantic Heritage Knowledge Graph"}
          </h1>
          <p className="text-sm text-navy-800/70 mt-1">
            {language === "mr"
              ? "व्यक्ती, घटना, कायदे, ग्रंथ व ऐतिहासिक स्थाने यांच्यातील परस्पर संबंधांचा सखोल आलेख."
              : language === "hi"
              ? "व्यक्तियों, घटनाओं, कानूनों, ग्रंथों और ऐतिहासिक स्थलों के बीच अंतर-संबंधों का अन्वेषण।"
              : "Explore the interconnected web of people, institutions, landmark treatises, statutes, and movements."}
          </p>
        </div>

        {/* Search & Zoom Toolbar */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="w-4 h-4 text-navy-800/50 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t.graph.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-auto pl-9 pr-3 py-1.5 text-base sm:text-xs rounded-lg border border-navy-900/20 bg-white focus:outline-none focus:ring-2 focus:ring-navy-900"
            />
          </div>
          <div className="flex items-center rounded-lg border border-navy-900/20 bg-white p-0.5 shadow-sm">
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.8))}
              className="p-1.5 hover:bg-parchment-200 rounded text-navy-900"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.6))}
              className="p-1.5 hover:bg-parchment-200 rounded text-navy-900"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1.5 hover:bg-parchment-200 rounded text-navy-900"
              title="Reset Zoom"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { id: "all", label: t.graph.entityTypes.all },
          { id: "person", label: t.graph.entityTypes.person },
          { id: "work", label: t.graph.entityTypes.work },
          { id: "legislation", label: t.graph.entityTypes.legislation },
          { id: "place", label: t.graph.entityTypes.place },
          { id: "organization", label: t.graph.entityTypes.organization },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id)}
            className={`px-3 py-1 text-xs rounded-full font-medium transition-all ${
              filterType === tab.id
                ? "bg-navy-900 text-white shadow-sm"
                : "bg-parchment-200 text-navy-800 hover:bg-parchment-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Graph Canvas and Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Canvas Area (8 Cols) */}
        <div className="lg:col-span-8 bg-white border border-navy-900/10 rounded-xl shadow-sm overflow-hidden p-2 relative h-[380px] sm:h-[500px] lg:h-[650px] flex items-center justify-center bg-radial-pattern">
          <svg
            viewBox="0 0 900 640"
            className="w-full h-full cursor-grab active:cursor-grabbing select-none"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: "center center", transition: "transform 0.2s ease" }}
          >
            {/* Edges */}
            <g className="edges">
              {edges.map((edge, idx) => {
                const sNode = positionedNodes.find((n) => n.id === edge.source);
                const tNode = positionedNodes.find((n) => n.id === edge.target);
                if (!sNode || !tNode) return null;

                const isConnectedToSelected =
                  selectedNode && (selectedNode.id === edge.source || selectedNode.id === edge.target);

                return (
                  <g key={idx}>
                    <line
                      x1={sNode.x}
                      y1={sNode.y}
                      x2={tNode.x}
                      y2={tNode.y}
                      stroke={isConnectedToSelected ? "#0B2A6F" : "#CBD5E1"}
                      strokeWidth={isConnectedToSelected ? 2.5 : 1}
                      strokeDasharray={isConnectedToSelected ? "none" : "3 3"}
                      strokeOpacity={isConnectedToSelected ? 0.9 : 0.6}
                    />
                    {/* Relationship label */}
                    {isConnectedToSelected && (
                      <text
                        x={(sNode.x! + tNode.x!) / 2}
                        y={(sNode.y! + tNode.y!) / 2 - 4}
                        textAnchor="middle"
                        fill="#0B2A6F"
                        fontSize="9"
                        fontWeight="600"
                        className="bg-white/80 select-none pointer-events-none"
                      >
                        {edge.relation_type.replace(/_/g, " ")}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>

            {/* Nodes */}
            <g className="nodes">
              {filteredNodes.map((node) => {
                const isSelected = selectedNode?.id === node.id;
                const isConnected = connectedNodes.some((cn) => cn.id === node.id);
                const color = getNodeColor(node.type);

                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    onClick={() => setSelectedNode(node)}
                    className="cursor-pointer group"
                  >
                    {/* Highlight ring */}
                    {(isSelected || isConnected) && (
                      <circle
                        r={isSelected ? 30 : 24}
                        fill="none"
                        stroke={isSelected ? "#C8A24A" : "#93C5FD"}
                        strokeWidth={isSelected ? 3 : 2}
                        strokeDasharray={isSelected ? "none" : "2 2"}
                        className="animate-pulse"
                      />
                    )}

                    {/* Main circle */}
                    <circle
                      r={node.id === "e1" ? 22 : 16}
                      fill={color}
                      stroke="#FFFFFF"
                      strokeWidth={2}
                      className="transition-transform duration-200 group-hover:scale-125 shadow-sm"
                    />

                    {/* Node label */}
                    <text
                      y={node.id === "e1" ? 34 : 26}
                      textAnchor="middle"
                      fill="#0B2A6F"
                      fontSize={node.id === "e1" ? "12" : "10"}
                      fontWeight={isSelected ? "700" : "500"}
                      className="select-none pointer-events-none drop-shadow-sm"
                    >
                      {node.name}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>

          {/* Quick Legend Overlay */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm border border-navy-900/10 rounded-lg p-2.5 shadow-sm text-[11px] grid grid-cols-2 gap-x-4 gap-y-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#0B2A6F" }}></span>
              <span>{t.graph.entityTypes.person}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#C8A24A" }}></span>
              <span>{t.graph.entityTypes.work}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#15803D" }}></span>
              <span>{t.graph.entityTypes.legislation}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#4338CA" }}></span>
              <span>{t.graph.entityTypes.organization}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#B91C1C" }}></span>
              <span>{t.graph.entityTypes.place}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#D97706" }}></span>
              <span>{t.graph.entityTypes.concept}</span>
            </div>
          </div>
        </div>

        {/* Selected Entity Inspector Panel (4 Cols) */}
        <div className="lg:col-span-4 bg-white border border-navy-900/10 rounded-xl shadow-sm p-6 flex flex-col justify-between h-[650px] overflow-y-auto">
          {selectedNode ? (
            <div>
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider mb-2">
                <span
                  className="px-2.5 py-0.5 rounded text-white"
                  style={{ backgroundColor: getNodeColor(selectedNode.type) }}
                >
                  {selectedNode.type}
                </span>
                <span className="text-navy-800/60 flex items-center gap-1">
                  <Share2 className="w-3.5 h-3.5" />
                  {connectedEdges.length} connections
                </span>
              </div>

              <h2 className="text-2xl font-serif font-bold text-navy-900 mt-2">
                {selectedNode.name}
              </h2>

              <p className="text-xs text-navy-800/80 mt-2 leading-relaxed bg-parchment-100 p-3 rounded-lg border border-navy-900/10">
                {selectedNode.type === "person" &&
                  "Historical protagonist in constitutional, social, and academic deliberations."}
                {selectedNode.type === "work" &&
                  "Foundational text published and archived within Dr. B. R. Ambedkar Writings and Speeches."}
                {selectedNode.type === "legislation" &&
                  "Statute, constitutional draft, or charter defining modern Indian democratic jurisprudence."}
                {selectedNode.type === "organization" &&
                  "Civic, educational, or political institution established or influenced by the movement."}
                {selectedNode.type === "place" &&
                  "Geographic location of pivotal historic demonstrations, assemblies, or milestones."}
                {selectedNode.type === "concept" &&
                  "Core philosophical or socio-political doctrine central to emancipatory discourse."}
              </p>

              {/* Connected Entities List */}
              <div className="mt-5">
                <h3 className="text-xs font-bold text-navy-900 uppercase tracking-wider mb-3">
                  {t.graph.connectedEntities} ({connectedEdges.length})
                </h3>
                <div className="space-y-2">
                  {connectedEdges.map((edge, idx) => {
                    const otherId = edge.source === selectedNode.id ? edge.target : edge.source;
                    const otherNode = nodes.find((n) => n.id === otherId);
                    if (!otherNode) return null;

                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedNode(otherNode)}
                        className="w-full text-left p-2.5 rounded-lg border border-navy-900/10 hover:border-navy-900/30 hover:bg-parchment-100 transition-colors flex items-center justify-between group"
                      >
                        <div>
                          <div className="text-[11px] font-semibold text-gold-700 uppercase tracking-wider">
                            {edge.relation_type.replace(/_/g, " ")}
                          </div>
                          <div className="text-xs font-bold text-navy-900 group-hover:text-navy-700">
                            {otherNode.name}
                          </div>
                        </div>
                        <span className="text-[10px] bg-parchment-200 px-1.5 py-0.5 rounded text-navy-800 uppercase font-medium">
                          {otherNode.type}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 text-navy-800/60">
              <Info className="w-10 h-10 mx-auto text-navy-800/40 mb-3" />
              <p>{t.graph.canvasHint}</p>
            </div>
          )}

          {/* Action Footer */}
          {selectedNode && (
            <div className="mt-6 pt-4 border-t border-navy-900/10 flex flex-col gap-2">
              <Link
                href={`/search?q=${encodeURIComponent(selectedNode.name)}`}
                className="w-full text-center py-2 px-3 text-xs font-semibold rounded-md bg-navy-900 text-white hover:bg-navy-800 transition-colors"
              >
                {t.graph.inspectCitations}
              </Link>
              <Link
                href="/timeline"
                className="w-full text-center py-2 px-3 text-xs font-semibold rounded-md border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white transition-colors"
              >
                {t.timeline.title}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
