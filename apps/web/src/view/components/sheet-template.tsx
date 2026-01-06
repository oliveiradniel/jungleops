import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from './ui/sheet';
import { Button } from './ui/button';

interface SheetTemplateProps {
  children: React.ReactNode;
  title: string;
  description: string;
  isOpen: boolean;
  isSubmitting: boolean;
  isFormInvalid: boolean;
  buttonLabel: string;
  onClose: () => void;
}

export function SheetTemplate({
  children,
  title,
  description,
  isOpen,
  isSubmitting,
  isFormInvalid,
  buttonLabel,
  onClose,
}: SheetTemplateProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        {children}
        <SheetFooter>
          <Button
            form="new-task-form"
            disabled={isFormInvalid || isSubmitting}
            isLoading={isSubmitting}
            onClick={() => {}}
          >
            {buttonLabel}
          </Button>
          <SheetClose asChild>
            <Button variant="outline">Fechar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
