import { useEffect, useState } from "react";
import type { Branch } from "../types/Branch";
import { getAllBranches } from "../services/branchService";

export const useBranches = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBranches = async () => {
    try {
      const data = await getAllBranches();
      setBranches(data);
    } catch (err) {
      console.error("Error fetching branches:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  return { branches, loading, fetchBranches };
};
