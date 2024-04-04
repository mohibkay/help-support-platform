import { useCurrentRole } from "@/hooks/useCurrentRole";
import { FormError } from "../ui/form-error";
import { UserType } from "@/types/User";

interface RoleGateProps {
  allowedRoles: UserType[];
  renderNoAccess?: React.ReactNode;
  children: React.ReactNode;
}

const RoleGate = ({
  children,
  allowedRoles,
  renderNoAccess = false,
}: RoleGateProps) => {
  const role = useCurrentRole();
  const isAllowed = allowedRoles.includes(role);

  if (!isAllowed && renderNoAccess) {
    return (
      <FormError
        message='You do not have permission to view this content!'
        className='mt-6'
      />
    );
  }

  if (!isAllowed) return null;

  return <>{children}</>;
};
export default RoleGate;
