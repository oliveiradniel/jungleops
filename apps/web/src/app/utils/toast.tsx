import { toast as sonnerToast } from 'sonner';

import {
  CustomToast,
  type CustomToastProps,
} from '@/view/components/ui/custom-toast';

export function toast({ type, description }: Omit<CustomToastProps, 'id'>) {
  return sonnerToast.custom((id) => (
    <CustomToast id={id} type={type} description={description} />
  ));
}
