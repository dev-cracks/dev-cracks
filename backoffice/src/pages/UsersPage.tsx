import { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  Text,
  makeStyles,
  shorthands,
  tokens,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
  TableHeaderCell,
  Button,
  Input,
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Field,
  Select,
  Spinner,
  MessageBar,
  MessageBarBody,
  Badge,
} from '@fluentui/react-components';
import {
  People,
  Search,
  Add,
  Delete,
  Edit,
  Dismiss,
} from '@fluentui/react-icons';
import { backofficeService, CreateUserRequest } from '../services/backofficeService';
import { UserDto } from '../services/authService';
import { useAuth } from '../hooks/useAuth';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXL),
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: tokens.spacingVerticalM,
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalM),
  },
  title: {
    fontSize: tokens.fontSizeHero800,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  toolbar: {
    display: 'flex',
    ...shorthands.gap(tokens.spacingHorizontalM),
    marginBottom: tokens.spacingVerticalL,
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: tokens.spacingVerticalXXL,
  },
});

export const UsersPage = () => {
  const styles = useStyles();
  const { userDetails } = useAuth();
  const [users, setUsers] = useState<UserDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserDto | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreateUserRequest>({
    auth0Id: '',
    email: '',
    name: '',
    role: 'User',
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await backofficeService.getUsers();
      setUsers(data);
    } catch (err: any) {
      setError(err.message || 'Error al cargar usuarios');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateUser = async () => {
    try {
      setError(null);
      if (!formData.auth0Id || !formData.email) {
        setError('Auth0Id y Email son requeridos');
        return;
      }

      await backofficeService.createUser(formData);
      setIsDialogOpen(false);
      setFormData({ auth0Id: '', email: '', name: '', role: 'User' });
      await loadUsers();
    } catch (err: any) {
      setError(err.message || 'Error al crear usuario');
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      setError(null);
      await backofficeService.deleteUser(selectedUser.id);
      setIsDeleteDialogOpen(false);
      setSelectedUser(null);
      await loadUsers();
    } catch (err: any) {
      setError(err.message || 'Error al eliminar usuario');
    }
  };

  const handleUpdateRole = async (userId: string, role: 'Admin' | 'User') => {
    try {
      setError(null);
      await backofficeService.updateUserRole(userId, role);
      await loadUsers();
    } catch (err: any) {
      setError(err.message || 'Error al actualizar rol');
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
  );

  const isAdmin = userDetails?.role === 'Admin';

  if (!isAdmin) {
    return (
      <div className={styles.container}>
        <MessageBar intent="warning">
          <MessageBarBody>
            No tienes permisos para acceder a esta página. Se requiere rol de Administrador.
          </MessageBarBody>
        </MessageBar>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {error && (
        <MessageBar intent="error" onDismiss={() => setError(null)}>
          <MessageBarBody>{error}</MessageBarBody>
        </MessageBar>
      )}

      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <People fontSize={32} />
          <h1 className={styles.title}>Usuarios del Tenant</h1>
        </div>
        <Button appearance="primary" icon={<Add />} onClick={() => setIsDialogOpen(true)}>
          Nuevo Usuario
        </Button>
      </div>

      <Card>
        <CardHeader header={<Text weight="semibold">Lista de Usuarios</Text>} />
        <div className={styles.toolbar}>
          <Input
            placeholder="Buscar usuarios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            contentBefore={<Search />}
            style={{ flex: 1 }}
          />
        </div>

        {isLoading ? (
          <div className={styles.loadingContainer}>
            <Spinner size="large" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Nombre</TableHeaderCell>
                <TableHeaderCell>Email</TableHeaderCell>
                <TableHeaderCell>Rol</TableHeaderCell>
                <TableHeaderCell>Fecha de Creación</TableHeaderCell>
                <TableHeaderCell>Acciones</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} style={{ textAlign: 'center' }}>
                    <Text>No hay usuarios disponibles</Text>
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name || 'Sin nombre'}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge
                        appearance={user.role === 'Admin' ? 'filled' : 'outline'}
                        color={user.role === 'Admin' ? 'brand' : 'neutral'}
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div style={{ display: 'flex', gap: tokens.spacingHorizontalXS }}>
                        <Button
                          appearance="subtle"
                          size="small"
                          icon={<Edit />}
                          onClick={() => {
                            const newRole = user.role === 'Admin' ? 'User' : 'Admin';
                            handleUpdateRole(user.id, newRole);
                          }}
                        >
                          {user.role === 'Admin' ? 'Quitar Admin' : 'Hacer Admin'}
                        </Button>
                        {user.id !== userDetails?.id && (
                          <Button
                            appearance="subtle"
                            size="small"
                            icon={<Delete />}
                            onClick={() => {
                              setSelectedUser(user);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            Eliminar
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </Card>

      {/* Dialog para crear usuario */}
      <Dialog open={isDialogOpen} onOpenChange={(_, data) => setIsDialogOpen(data.open)}>
        <DialogSurface>
          <DialogTitle>Nuevo Usuario</DialogTitle>
          <DialogBody>
            <DialogContent>
              <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
                <Field label="Auth0 ID" required>
                  <Input
                    value={formData.auth0Id}
                    onChange={(e) => setFormData({ ...formData, auth0Id: e.target.value })}
                    placeholder="auth0|..."
                  />
                </Field>
                <Field label="Email" required>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="usuario@ejemplo.com"
                  />
                </Field>
                <Field label="Nombre">
                  <Input
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nombre completo"
                  />
                </Field>
                <Field label="Rol">
                  <Select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as 'Admin' | 'User' })}
                  >
                    <option value="User">Usuario</option>
                    <option value="Admin">Administrador</option>
                  </Select>
                </Field>
              </div>
            </DialogContent>
            <DialogActions>
              <Button appearance="secondary" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button appearance="primary" onClick={handleCreateUser}>
                Crear
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>

      {/* Dialog para confirmar eliminación */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={(_, data) => setIsDeleteDialogOpen(data.open)}>
        <DialogSurface>
          <DialogTitle>Confirmar Eliminación</DialogTitle>
          <DialogBody>
            <DialogContent>
              <Text>
                ¿Estás seguro de que deseas eliminar al usuario{' '}
                <strong>{selectedUser?.name || selectedUser?.email}</strong>?
              </Text>
            </DialogContent>
            <DialogActions>
              <Button appearance="secondary" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancelar
              </Button>
              <Button appearance="primary" onClick={handleDeleteUser}>
                Eliminar
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </div>
  );
};
