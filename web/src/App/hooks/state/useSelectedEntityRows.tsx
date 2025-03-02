import { useCallback, useState } from "react";

export function useSelectedEntityRows() {
  const [isSelectMode, _setIsSelectMode] = useState(false);
  const [entityRowIDs, _setEntityRowIDs] = useState<number[]>([]);

  const toggleEntityRow = useCallback(
    (id: number) => {
      _setEntityRowIDs((current) => {
        const copy = current.slice();

        if (!current.includes(id)) {
          copy.push(id);
        } else {
          copy.splice(copy.indexOf(id), 1);
        }

        return copy;
      });
    },
    [_setEntityRowIDs]
  );

  const startSelectMode = useCallback(() => {
    _setIsSelectMode(true);
    _setEntityRowIDs([]);
  }, [_setIsSelectMode, _setEntityRowIDs]);

  const stopSelectMode = useCallback(
    (onStop: (values: number[]) => void) => {
      _setIsSelectMode(false);
      onStop(entityRowIDs);
    },
    [_setIsSelectMode]
  );

  return {
    selectedEntityIDs: entityRowIDs,
    isSelectMode,
    startSelectMode,
    stopSelectMode,
    toggleEntityRow,
  };
}
