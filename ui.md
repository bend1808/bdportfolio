# User Interface Specification

## Overview

> **Related Documents**: [SEO Landing Page Implementation Plan](/docs/plans/seo-landing-page-implementation.md)

## Overview

This document outlines the user interface requirements for the IR Pros P&ID Estimator web application.

See the canonical authentication and access control specification in `Specs/authentication.md`.

## Technical Stack

### Frontend Framework
- **Next.js 15** with TypeScript for type safety and modern React features
- **App Router** for file-based routing and server components
- **React 18+** with concurrent features and Suspense

### UI Component Libraries
- **Material-UI (MUI)** for comprehensive component library and admin interfaces
- **Shadcn/ui** for modern, customizable components where needed
- **Tailwind CSS** for utility-first styling and responsive design
- **Lucide React** for consistent iconography

### Form Handling & Validation
- **React Hook Form** for performant form management
- **Zod** for TypeScript-first schema validation
- **React Dropzone** for file upload handling

### State Management
- **Redux Toolkit** for global application state
- **React Query/TanStack Query** for server state management
- **Zustand** for lightweight local state when needed

## Core Functionality

### 1. Legal & Compliance

#### Terms of Service & Privacy Policy

- **Requirement**: Users must acknowledge reading and agreeing to both documents before submitting data
- **Implementation**:
  - Modal dialog or dedicated page shown on first visit
  - Checkbox confirmation for each document
  - Links to full documents (opening in new tabs)
  - Session storage to remember user's acceptance


#### sample langing pages to consider copying ****
https://swipepages.com/blog/landing-page-examples/
https://miro.com/aq/paid-search/how-to-mind-map-with-tony-buzan/
https://www.shopify.com/free-trial
https://stripe.com/in/lp/payments/payment-processing
https://webflow.com/design/lp1
https://www.loom.com/lp/mac-screen-recorder-lp
https://monday.com/lp/integration/slack/

https://inkbotdesign.com/best-landing-pages/

##### Terms of Service Content

- Data usage and processing policies
- User responsibilities and restrictions
- Intellectual property rights
- Liability limitations
- Termination conditions
- No warranties provided for errors and omissions
- Agreement to receive marketing communications
- Agreement to receive updates and notifications via text (optional)

##### Privacy Policy Content

- Data collection practices
- Storage and security measures
- Data retention policies
- User rights (access, rectification, erasure)
- Third-party data sharing

#### Cookie Preferences

- Users must be able to manage cookie consent with granular categories.

##### Categories

- Essential (required, always on): authentication/session, security, load balancing.
- Functional (optional, default OFF): preferences such as language, remembered form values.
- Analytics (optional, default OFF): GA4 and similar analytics.
- Marketing (optional, default OFF): advertising and tracking.

##### Controls

- Buttons: Accept All, Reject All (essential only), Save Preferences.
- Per-category toggles with brief descriptions.
- Persistent link “Cookie Settings” in footer to reopen the manager.

##### Behavior

- Show consent banner on first visit and when policy version changes or consent expires.
- Do not block essential site usage; banner non-intrusive, accessible, keyboard-navigable.
- Respect regional rules (e.g., EU: default all optional OFF; US: follow state-level norms).
- Store consent state in a first-party cookie (e.g., cookie_consent=vX; 6–12 months expiry) with timestamp and policy version.
- Provide link to Privacy Policy and list of vendors/technologies used.

##### Accessibility & Compliance

- WCAG 2.1 AA compliance, focus trapping, ARIA roles, high contrast support.
- Honor browser “Do Not Track” where feasible by setting optional categories OFF by default.

##### Security

- All cookies set with Secure; HttpOnly for server-set session; SameSite=Lax or Strict as appropriate.

### 2. File Management

#### File Upload Interface

### Upload Component Architecture
- **React Dropzone** integration for drag-and-drop functionality
- **Azure Storage SDK** for direct blob upload with SAS tokens
- **Chunked upload** support for large files (>10MB)
- **Upload progress tracking** with real-time percentage updates
- **Retry mechanism** for failed uploads

### Upload Area
- Drag-and-drop zone for P&ID files
- Support for PDF, PNG, JPG formats
- File size validation (max 50MB)
- Progress indicator during upload
- Error handling for invalid files
- **Azure Storage integration** with secure blob container access
- **Metadata capture** (filename, size, upload timestamp)
- **Virus scanning** integration before processing

#### Processing Status

- Real-time updates via WebSockets
- Visual progress indicators
- Estimated completion time
- Error notifications with retry options
- Processing history with timestamps

### 2. User Interface Components

#### Layout Structure

- **Header**: Application branding, main navigation, user menu
- **Main Content**: Dynamic content area based on route
- **Sidebar**: Contextual actions and filters
- **Footer**: Legal information, contact details, version

#### Interactive Elements

- **Buttons**: Primary, secondary, and tertiary variants
- **Forms**: Consistent validation and error handling
- **Modals**: For confirmations and additional actions
- **Tooltips**: Contextual help and information
- **Toasts**: Non-intrusive system messages

### 3. User Flows

#### Guest User

Note: In production, file uploads require sign-in via Entra ID (workforce) or External ID (B2C). If a "guest upload" trial mode is enabled, apply strict rate limits, display ToS/Privacy consent, and require email verification before processing.

1. Landing page with value proposition
2. File upload interface
3. User information form with the following fields:
   - **Personal Information** (required)
     - First Name (text input, required)
     - Last Name (text input, required)
     - Email (email input, required with validation)
     - Phone Number (tel input with international format support)
     - Job Title (text input)
   - **Company Information** (required)
     - Company Name (text input, required)
     - Industry (dropdown with common industries)
     - Company Size (dropdown: 1-10, 11-50, 51-200, 201-1000, 1000+)
     - Website URL (url input with validation)
   - **Plant Information** (required)
     - Plant Name (text input, required)
     - Description or interesting facts (optional)
   - **IR Pros Customer Status** (required)
     - Are you an existing IR Pros customer? (radio buttons: Yes/No)
     - If yes, account number (text input, optional)
   - **Communication Preferences**
     - By submitting to this form, I agree to receive marketing communications  (optional) 
     - By submitting to this form, I agree to the Terms of Service and Privacy Policy (links to full documents)
4. Submission confirmation with estimated processing time
5. Email verification with a verification link (guest trial mode only; SSO flows handle identity for authenticated users)
6. Follow-up email with report access and sales contact information
7. Collect IP of users and use open source source to geolocate them and store in database.

#### Authenticated User
1. Dashboard with recent activities
2. File management interface
3. Processing status tracking
4. Report viewing and download
5. Account settings management

## Security Implementation

### Authentication
- Sign-in is handled by Azure App Service Authentication v2 (Easy Auth) on `app.irpros.ai`.
  - Workforce users authenticate with Azure Entra ID (single-tenant).
  - Customer users authenticate with Azure Entra External ID (B2C) user flows.
- MFA
  - Entra ID: enforced via Conditional Access policies.
  - External ID: enforced via B2C user flow configuration.
- Session
  - 30-minute idle timeout; 8-hour absolute timeout (Easy Auth session cookies).
  - Use `/.auth/logout` to end the session.
- Tokens and API calls
  - Retrieve tokens from `/.auth/me` and attach `Authorization: Bearer <token>` to API requests.
  - Backend trusts Easy Auth headers or validates JWTs; strict CORS to approved origins.
- Social login/passwordless options are only available if enabled through External ID (B2C) user flows. No app-managed passwords or refresh tokens.

### RBAC and Route Protection

- Role-aware UI based on Entra App Roles (e.g., Admin, Manager, Reviewer, Customer).
- Hide admin-only navigation and components when role claims are absent; deny-by-default.
- Enforce route guards for privileged routes; rely on server-side authorization as source of truth.
- Organization scoping via custom claims (e.g., `extension_orgId`) where present.

### Data Protection
- Client-side encryption for sensitive data
- Secure cookie handling (HttpOnly, Secure, SameSite)
- CSP headers with nonce-based scripts
- XSS and CSRF protection

### Compliance
- Accessibility (WCAG 2.1 AA)
- Privacy regulations (GDPR, CCPA)
- Industry standards (ISO 27001, SOC 2)
- Regular security audits

## Performance Optimization

### Client-Side
- Code splitting and lazy loading
- Image optimization and lazy loading
- Service worker for offline capabilities
- Efficient state management

### Network
- HTTP/2 for multiplexing
- Brotli compression for assets
- API response caching

### Rendering
- Server-side rendering (SSR) for SEO
- Static site generation (SSG) where applicable
- Optimized critical rendering path
- Efficient virtual DOM updates

## Integration Points

### Backend Services
- **API Gateway**: RESTful endpoints for data operations
- **Authentication**: Azure App Service Authentication (Easy Auth) as the auth gateway; identity providers are Azure Entra ID (workforce) and Azure Entra External ID (B2C). No app-managed passwords.
- **Processing Service**: Document analysis and report generation
- **Notification Service**: Email and in-app notifications

### Third-party Services
- **Payment Processing**: Stripe/PayPal integration
- **Analytics**: Google Analytics 4 with custom events
- **Error Tracking**: Sentry for frontend monitoring
- **Email Service**: SendGrid for transactional emails

## Testing Strategy

### Unit Testing
- Component rendering and interactions
- State management logic
- Utility functions and helpers
- Test coverage threshold: 80%+

### Integration Testing
- User flows and navigation
- Form submissions and validation
- API interactions
- Authentication scenarios

### E2E Testing
- Critical user journeys
- Cross-browser compatibility
- Performance benchmarks
- Accessibility testing

## Documentation

### Technical Documentation
- Component API references
- State management patterns
- Testing guidelines
- Deployment procedures

### User Documentation
- Interactive tutorials
- FAQ section
- Video walkthroughs
- Contextual help system

## Maintenance & Support

### Monitoring
- Real-user monitoring (RUM)
- Error tracking and reporting
- Performance metrics
- Usage analytics

### Updates
- Scheduled maintenance windows
- Versioned releases
- Changelog maintenance
- Deprecation policies

## Future Roadmap

### Short-term (Next 3 months)
- Enhanced file preview capabilities
- Mobile-responsive optimizations
- Basic reporting dashboard

### Medium-term (3-6 months)
- Advanced filtering and search
- Custom report templates
- API for third-party integrations
- Configured to support Google Adwords and other marketing channels for conversion tracking.

### Long-term (6+ months)
- AI-assisted form filling
- Collaborative features
- Mobile application release



