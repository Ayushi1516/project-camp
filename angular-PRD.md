###Project structure

src/app/
├── core/                    # Guards, interceptors, singleton services
├── models/                  # Add subtask.model.ts, member.model.ts
├── services/                # Implement project/task/note CRUD services
├── features/                # 🆕 Feature modules (lazy-loaded)
│   ├── auth/                # (already exists)
│   ├── projects/            # list, detail, form, members
│   ├── tasks/               # list, detail, form, subtask-list
│   ├── notes/               # list, detail, form
│   ├── admin/               # admin-dashboard + user-management
│   ├── dashboard/
│   ├── member/
│   └── home/
├── shared/                  # Reusable UI kit (status-badge, confirm-dialog, file-upload)
└── layouts/                 # Sidebar, navbar, main-layout


  ### 2. Target Users

- **Project Administrators:** Create and manage projects, assign roles, oversee all project activities
- **Project Admins:** Manage tasks and project content within assigned projects
- **Team Members:** View projects, update task completion status, access project information

### 3. Core Features

#### 3.1 User Authentication & Authorization

- **User Registration:** Account creation with email verification
- **User Login:** Secure authentication with JWT tokens
- **Password Management:** Change password, forgot/reset password functionality
- **Email Verification:** Account verification via email tokens
- **Token Management:** Access token refresh mechanism
- **Role-Based Access Control:** Three-tier permission system (Admin, Project Admin, Member)

#### 3.2 Project Management

- **Project Creation:** Create new projects with name and description
- **Project Listing:** View all projects user has access to with member count
- **Project Details:** Access individual project information
- **Project Updates:** Modify project information (Admin only)
- **Project Deletion:** Remove projects (Admin only)

#### 3.3 Team Member Management

- **Member Addition:** Invite users to projects via email
- **Member Listing:** View all project team members
- **Role Management:** Update member roles within projects (Admin only)
- **Member Removal:** Remove team members from projects (Admin only)

#### 3.4 Task Management

- **Task Creation:** Create tasks with title, description, and assignee
- **Task Listing:** View all tasks within a project
- **Task Details:** Access individual task information
- **Task Updates:** Modify task information and status
- **Task Deletion:** Remove tasks from projects
- **File Attachments:** Support for multiple file attachments on tasks
- **Task Assignment:** Assign tasks to specific team members
- **Status Tracking:** Three-state status system (Todo, In Progress, Done)

#### 3.5 Subtask Management

- **Subtask Creation:** Add subtasks to existing tasks
- **Subtask Updates:** Modify subtask details and completion status
- **Subtask Deletion:** Remove subtasks (Admin/Project Admin only)
- **Member Completion:** Allow members to mark subtasks as complete

#### 3.6 Project Notes

- **Note Creation:** Add notes to projects (Admin only)
- **Note Listing:** View all project notes
- **Note Details:** Access individual note content
- **Note Updates:** Modify existing notes (Admin only)
- **Note Deletion:** Remove notes (Admin only)

