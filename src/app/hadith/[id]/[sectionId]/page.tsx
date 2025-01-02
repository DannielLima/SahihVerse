"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Hadith {
  hadithNumber: string;
  text: string;
}

const fetchHadiths = async (
  id: string,
  sectionId: string
): Promise<Hadith[]> => {
  const res = await fetch(
    `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${id}/sections/${sectionId}.json`
  );
  const data = await res.json();
  return (data.hadiths || []).filter(
    (hadith: Hadith) => hadith.text.trim().length > 0
  );
};

const HadithsPage = () => {
  const params = useParams();
  const id = params.id as string;
  const sectionId = (params.sectionId as string).replace(/\s+/g, "");
  const [hadiths, setHadiths] = useState<Hadith[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadHadiths = async () => {
      setLoading(true);
      const data = await fetchHadiths(id, sectionId);
      setHadiths(data);
      setLoading(false);
    };
    loadHadiths();
  }, [id, sectionId]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Hadiths</h1>
      {loading ? (
        <p>Loading...</p>
      ) : hadiths.length > 0 ? (
        <div className="space-y-4">
          {hadiths.map((hadith) => (
            <div key={hadith.hadithNumber} className="p-4 border rounded">
              <h2 className="font-semibold">Hadith {hadith.hadithNumber}</h2>
              <p>{hadith.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No hadiths found.</p>
      )}
    </div>
  );
};

export default HadithsPage;
