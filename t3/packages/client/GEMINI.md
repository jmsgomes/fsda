## `client` pakacge: Web Client (Frontend)

IMPORTANT: Use Angular as I am currently the most proficient with it.

- Use Angular Signals where applicable.
  - Use `resource` for fetching resources
- Naming convention as follows:
  - All `@Component` classes should have `Component` suffix.
  - All `@Directive` classes should have `Directive` suffix.
  - Selectors do not use `-component` or `-directive` suffixes.
  - Services should have `Service` suffix, and should be organized under a single higher-level `services` folder.
  - Pipes should have `Pipe` suffix.
- Use Dependency Injection/Dependency Inversion appropriately/
  - For each component, create a `testing` subpackage that features an `@NgModule` (named `*ComponentTestingModule`, where \* is the name of the component)
