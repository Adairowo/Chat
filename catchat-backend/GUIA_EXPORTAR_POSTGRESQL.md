# Guía: Exportar Tablas de Laravel a PostgreSQL (pgAdmin 4)

## 📌 Requisitos Previos
- PostgreSQL instalado en tu sistema
- pgAdmin 4 instalado
- Extensión de PostgreSQL para PHP instalada (`php_pgsql.dll`)

## 🔧 Paso 1: Configurar PostgreSQL en Laravel

### 1.1 Verificar extensión PHP para PostgreSQL
Abre tu archivo `php.ini` y asegúrate de que estas líneas estén descomentadas (sin `;` al inicio):
```ini
extension=pdo_pgsql
extension=pgsql
```

### 1.2 Modificar el archivo `.env`
Actualiza tu archivo `.env` con la configuración de PostgreSQL:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=catchat_db
DB_USERNAME=postgres
DB_PASSWORD=tu_contraseña_postgres
```

**Nota:** Reemplaza `tu_contraseña_postgres` con la contraseña que configuraste al instalar PostgreSQL.

## 🗄️ Paso 2: Crear la Base de Datos en pgAdmin 4

### 2.1 Abrir pgAdmin 4
1. Abre pgAdmin 4
2. Conéctate a tu servidor PostgreSQL local
3. Ingresa tu contraseña maestra si te la solicita

### 2.2 Crear nueva base de datos
1. Click derecho en "Databases" → "Create" → "Database..."
2. En el campo "Database", escribe: `catchat_db`
3. En "Owner", selecciona: `postgres`
4. Click en "Save"

## 🚀 Paso 3: Ejecutar las Migraciones

### 3.1 Limpiar caché de configuración
```bash
php artisan config:clear
php artisan cache:clear
```

### 3.2 Ejecutar migraciones
```bash
php artisan migrate
```

Este comando creará todas tus tablas en PostgreSQL:
- users
- password_reset_tokens
- failed_jobs
- personal_access_tokens
- conversations
- messages
- conversation_user

### 3.3 (Opcional) Ejecutar seeders si tienes datos de prueba
```bash
php artisan db:seed
```

## 📊 Paso 4: Verificar las Tablas en pgAdmin 4

1. En pgAdmin 4, expande:
   - Servers → PostgreSQL → Databases → catchat_db → Schemas → public → Tables
2. Deberías ver todas tus tablas creadas
3. Click derecho en cualquier tabla → "View/Edit Data" → "All Rows" para ver los datos

## 🔄 Migrar Datos Existentes (Si ya tienes datos en otra BD)

### Opción A: Exportar desde MySQL/SQLite e Importar a PostgreSQL

Si ya tienes datos en otra base de datos (MySQL, SQLite, etc.):

#### 1. Exportar datos actuales
```bash
php artisan db:seed --class=ExportDataSeeder
```

#### 2. Cambiar a PostgreSQL en `.env`
Actualiza `DB_CONNECTION=pgsql`

#### 3. Ejecutar migraciones
```bash
php artisan migrate:fresh
```

#### 4. Importar datos
```bash
php artisan db:seed
```

### Opción B: Usar herramienta de migración

Puedes usar herramientas como:
- **pgLoader** - Para migrar desde MySQL a PostgreSQL
- **DBeaver** - Para transferir datos entre bases de datos

## 🛠️ Comandos Útiles de Laravel

```bash
# Ver estado de migraciones
php artisan migrate:status

# Revertir última migración
php artisan migrate:rollback

# Revertir todas las migraciones
php artisan migrate:reset

# Refrescar base de datos (eliminar todo y recrear)
php artisan migrate:fresh

# Refrescar y ejecutar seeders
php artisan migrate:fresh --seed
```

## 🔍 Verificar Conexión a PostgreSQL

Crea un archivo de prueba para verificar la conexión:

```bash
php artisan tinker
```

Luego ejecuta:
```php
DB::connection()->getPdo();
echo "Conexión exitosa a: " . DB::connection()->getDatabaseName();
```

## ⚠️ Solución de Problemas Comunes

### Error: "could not find driver"
**Solución:** Instala o habilita la extensión PHP para PostgreSQL
```bash
# En Windows, edita php.ini y descomenta:
extension=pdo_pgsql
extension=pgsql

# Reinicia tu servidor web (Apache/Nginx)
```

### Error: "SQLSTATE[08006] Connection refused"
**Solución:** Verifica que PostgreSQL esté corriendo
```bash
# En Windows, verifica el servicio:
# Services → postgresql-x64-xx → Start
```

### Error: "database does not exist"
**Solución:** Crea la base de datos manualmente en pgAdmin 4 (ver Paso 2.2)

## 📝 Notas Adicionales

- **Backup:** Siempre haz un backup de tu base de datos actual antes de migrar
- **Compatibilidad:** Algunas funciones específicas de MySQL pueden necesitar ajustes para PostgreSQL
- **Tipos de datos:** PostgreSQL maneja algunos tipos de datos diferente a MySQL (ej: `boolean` vs `tinyint`)

## 🎯 Resumen Rápido

1. ✅ Habilitar extensión PostgreSQL en PHP
2. ✅ Crear base de datos en pgAdmin 4
3. ✅ Actualizar `.env` con credenciales PostgreSQL
4. ✅ Ejecutar `php artisan migrate`
5. ✅ Verificar tablas en pgAdmin 4

---

**¿Necesitas ayuda?** Si encuentras algún error durante el proceso, revisa la sección de "Solución de Problemas Comunes" o consulta los logs de Laravel en `storage/logs/laravel.log`
