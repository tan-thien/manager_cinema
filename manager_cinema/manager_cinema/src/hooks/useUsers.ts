import { useEffect, useState } from "react";
import type { Account } from "../types/Account";
import { getAllUsers } from "../services/accountService";

export const useUsers = () => {
  const [users, setUsers] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading };
};
