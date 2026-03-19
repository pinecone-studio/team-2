'use client';

import { useEffect, useState } from 'react';

import {
  FileText,
  ExternalLink,
  Calendar,
  Building2,
  Percent,
  X,
} from 'lucide-react';
import {
  GetBenefitsDocument,
  GetBenefitsQuery,
} from 'apps/dash/src/graphql/generated/graphql';
import { gqlRequest } from 'apps/dash/src/graphql/helpers/graphql-client';

type Benefit = GetBenefitsQuery['benefits'][number];

function sortBenefitsNewestFirst(benefits: Benefit[]) {
  return [...benefits].sort((first, second) => {
    const firstUploadedAt = first.contractUploadedAt
      ? new Date(first.contractUploadedAt).getTime()
      : 0;
    const secondUploadedAt = second.contractUploadedAt
      ? new Date(second.contractUploadedAt).getTime()
      : 0;

    if (secondUploadedAt !== firstUploadedAt) {
      return secondUploadedAt - firstUploadedAt;
    }

    return second.id - first.id;
  });
}

export default function ContractsPage() {
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContractUrl, setSelectedContractUrl] = useState('');
  const [selectedContractName, setSelectedContractName] = useState('');

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      try {
        const data = await gqlRequest(GetBenefitsDocument);
        // only benefits that have a contract uploaded
        setBenefits(
          sortBenefitsNewestFirst(data.benefits.filter((b) => b.r2ObjectKey)),
        );
      } catch (e: any) {
        setError(e.message ?? 'Failed to fetch benefits');
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, []);

  function handleViewContract(benefit: Benefit) {
    if (!benefit.r2ObjectKey) return;
    const url = `https://team-service.nbhishgee22.workers.dev/api/images/${benefit.r2ObjectKey}`;
    setSelectedContractUrl(url);
    setSelectedContractName(benefit.name ?? 'contract');
    setIsModalOpen(true);
  }

  async function handleDownload() {
    if (!selectedContractUrl) return;

    const res = await fetch(selectedContractUrl);
    if (!res.ok) throw new Error('Download failed');

    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = objectUrl;
    a.download = `${selectedContractName}-contract`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(objectUrl);
  }

  function formatDate(dateStr?: string | null) {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  function isExpired(dateStr?: string | null) {
    if (!dateStr) return false;
    return new Date(dateStr) < new Date();
  }

  function isExpiringSoon(dateStr?: string | null) {
    if (!dateStr) return false;
    const diff = new Date(dateStr).getTime() - Date.now();
    return diff > 0 && diff < 30 * 24 * 60 * 60 * 1000; // within 30 days
  }

  if (loading) {
    return (
      <div className="w-full min-h-screen py-8">
        <div className="max-w-[1215px] mx-auto">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 w-64 bg-gray-100 rounded animate-pulse mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl h-48 animate-pulse border border-gray-100"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) return <p className="text-red-500 p-8">{error}</p>;

  return (
    <div className="w-full min-h-screen py-8">
      <div className="max-w-[1215px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[#0F172A] text-2xl font-bold tracking-tight">
            Contracts
          </h1>
          <p className="text-[#64748B] text-sm mt-1">
            View and manage uploaded benefit contracts
          </p>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4">
            <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1">
              Total Contracts
            </p>
            <p className="text-2xl font-bold text-[#0F172A]">
              {benefits.length}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4">
            <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1">
              Expiring Soon
            </p>
            <p className="text-2xl font-bold text-amber-500">
              {
                benefits.filter((b) => isExpiringSoon(b.contractExpiryDate))
                  .length
              }
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4">
            <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1">
              Expired
            </p>
            <p className="text-2xl font-bold text-red-500">
              {benefits.filter((b) => isExpired(b.contractExpiryDate)).length}
            </p>
          </div>
        </div>

        {/* Empty state */}
        {benefits.length === 0 && (
          <div className="bg-white rounded-xl border border-dashed border-gray-200 py-20 flex flex-col items-center justify-center">
            <FileText size={40} className="text-gray-300 mb-3" />
            <p className="text-sm font-medium text-gray-500">
              No contracts uploaded yet
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Upload a contract file when adding a benefit
            </p>
          </div>
        )}

        {/* Cards grid */}
        {benefits.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((benefit) => {
              const expired = isExpired(benefit.contractExpiryDate);
              const expiringSoon = isExpiringSoon(benefit.contractExpiryDate);

              return (
                <div
                  key={benefit.id}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col"
                >
                  {/* Card top */}
                  <div className="px-5 pt-5 pb-4 flex-1">
                    {/* Icon + title row */}
                    <div className="flex items-start gap-3 mb-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                        <FileText size={18} className="text-orange-400" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-[#0F172A] truncate">
                          {benefit.name}
                        </h3>
                        {benefit.description && (
                          <p className="text-xs text-[#64748B] mt-0.5 line-clamp-2">
                            {benefit.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Detail rows */}
                    <div className="space-y-2">
                      {benefit.category && (
                        <div className="flex items-center gap-2 text-xs text-[#64748B]">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#F1F5F9] text-[#475569] font-medium">
                            {benefit.category}
                          </span>
                        </div>
                      )}

                      {benefit.vendorName && (
                        <div className="flex items-center gap-2 text-xs text-[#64748B]">
                          <Building2
                            size={12}
                            className="text-gray-400 flex-shrink-0"
                          />
                          <span>{benefit.vendorName}</span>
                        </div>
                      )}

                      {benefit.subsidyPercent != null && (
                        <div className="flex items-center gap-2 text-xs text-[#64748B]">
                          <Percent
                            size={12}
                            className="text-gray-400 flex-shrink-0"
                          />
                          <span>{benefit.subsidyPercent}% subsidy</span>
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-xs">
                        <Calendar
                          size={12}
                          className="text-gray-400 flex-shrink-0"
                        />
                        <span
                          className={
                            expired
                              ? 'text-red-500 font-medium'
                              : expiringSoon
                                ? 'text-amber-500 font-medium'
                                : 'text-[#64748B]'
                          }
                        >
                          {benefit.contractExpiryDate
                            ? `Expires ${formatDate(benefit.contractExpiryDate)}`
                            : 'No expiry date'}
                        </span>
                        {expired && (
                          <span className="ml-auto px-1.5 py-0.5 rounded text-[10px] font-semibold bg-red-50 text-red-500 border border-red-100">
                            Expired
                          </span>
                        )}
                        {expiringSoon && !expired && (
                          <span className="ml-auto px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-500 border border-amber-100">
                            Soon
                          </span>
                        )}
                      </div>

                      {benefit.contractUploadedAt && (
                        <div className="text-[11px] text-[#94A3B8]">
                          Uploaded {formatDate(benefit.contractUploadedAt)}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card footer */}
                  <div className="px-5 py-3 border-t border-gray-100">
                    <button
                      onClick={() => handleViewContract(benefit)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-t from-orange-300 to-orange-500 text-white text-sm font-semibold transition-colors"
                    >
                      <ExternalLink size={14} />
                      View Contract
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="w-full max-w-4xl rounded-2xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b px-4 py-3">
              <h3 className="text-sm font-semibold text-[#17233C]">
                {selectedContractName} contract
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                <X size={16} />
              </button>
            </div>

            <div className="h-[70vh] w-full bg-gray-50">
              <iframe src={selectedContractUrl} className="h-full w-full" />
            </div>

            <div className="flex justify-end gap-2 border-t px-4 py-3">
              <button
                onClick={handleDownload}
                className="rounded-md bg-orange-400 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-500"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
