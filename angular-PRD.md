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
