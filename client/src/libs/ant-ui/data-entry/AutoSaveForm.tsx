import { useFormikContext } from 'formik';
import { useCallback, useState } from 'react';
import { useDeepCompareEffect } from 'react-use';

/**
 * Automatic saves formik form
 * @param debounceMs
 */
export const AutoSaveForm = ({ debounceMs }: { debounceMs: number }) => {
  const formik = useFormikContext();
  const [lastSaved, setLastSaved] = useState(Date);
  const debouncedSubmit = useCallback(() => formik.submitForm().then(() => setLastSaved(new Date().toISOString())), [debounceMs, formik.submitForm]);

  useDeepCompareEffect(() => {
    debouncedSubmit();
  }, [debouncedSubmit, JSON.stringify(formik.values)]);

  return <></>;
};
