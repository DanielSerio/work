import { useMutation } from "@tanstack/react-query";

export function useDeleteMany(name: "companies" | "categories") {
  return useMutation({
    mutationKey: [name, "delete", "list"],
    async mutationFn(ids: number[]) {
      const response = await fetch(`/api/${name}/delete`, {
        method: "POST",
        body: JSON.stringify(ids),
      });

      return await response.json();
    },
  });
}
