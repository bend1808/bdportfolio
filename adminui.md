# IR Pros P&ID Estimator Admin Portal

## Overview

The IR Pros P&ID Estimator Admin Portal is a comprehensive administrative interface for a unified SaaS platform while maintaining IR Pros' industry-leading reputation for expertise and compliance. This secure, role-based interface enables administrators to manage the platform that positions IR Pros as the trusted authority in industrial refrigeration P&ID analysis, serving plant engineers, maintenance managers, and compliance officers with "compliance insurance" rather than just another maintenance tool.

## Technical Stack

### Core Technologies
- **Framework**: TypeScript with Next.js (React-based)
- **State Management**: Redux Toolkit with RTK Query
- **Styling**: Material-UI with custom theme and component overrides
- **Form Handling**: React Hook Form with Yup validation
- **UI Components**: Custom design system with accessibility compliance

### Hosting & Infrastructure
- **Primary**: Azure App Service (Basic or Standard tier) optimized for predictable, unified scaling
- **Containerization**: Docker with Azure Container Registry for consistent deployments
- **CI/CD**: GitHub Actions with environment-based deployments supporting rapid feature releases
- **Monitoring**: Azure Monitor with comprehensive platform health and usage metrics
- **Analytics**: Advanced usage analytics to support product improvement and customer value delivery

### Security
- **Authentication**: Azure Entra ID (single-tenant) via Azure App Service Authentication v2 (Easy Auth)
- **Authorization**: Fine-grained role-based access control (RBAC)
- **Protection**: OWASP Top 10 mitigation strategies
- **Compliance**: SOC 2, GDPR, HIPAA, and industry-specific regulations
- **Audit**: Comprehensive audit logging and activity tracking

## Authentication & Access Control

### User Authentication

- Sign-in is handled by Azure Entra ID (single-tenant) through Azure App Service Authentication v2 (Easy Auth) on `admin.irpros.ai`.
- MFA is enforced via Entra Conditional Access policies.
- Session policy: 30 minutes idle timeout and 8 hours absolute; sign-out ends the Easy Auth session and clears the token store.
- Tokens are retrieved via `/.auth/me`; the frontend attaches `Authorization: Bearer <token>` to API requests. The backend trusts Easy Auth headers or validates JWTs.
- No local usernames/passwords. Identity lifecycle (creation, disablement, password policies) is managed in Entra ID.

See `Specs/authentication.md` for the canonical hybrid auth and RBAC specification.

### Role-Based Access Control (RBAC)

- **IR Pro Expert**
  - Review and approve analysis results with IR Pros' industry authority
  - Generate and manage secure download links for professional reports
  - View processing history and logs with compliance audit trails
  - Manage client communications emphasizing IR Pros expertise
  - Update report status and notes with professional recommendations

- **Administrator**
  - Manage IR Pro user accounts
  - Configure system settings and integrations
  - Access audit logs and system metrics
  - Handle escalations and exceptions
  - Manage customer data deletion
  - Review and approve analysis results
    - Generate and manage secure download links
  - View processing history and logs
  - Manage client communications
  - Update report status and notes

- **Auditor**
  - View all reports and activities
  - Access audit trails
  - Generate compliance reports
  - No modification rights

## Report Review Dashboard

### Overview

- **Pending Review**: Number of reports awaiting IR Pro expert review
- **Completed Today**: Reports processed in the last 24 hours
- **Processing Queue**: Number of files currently being processed
- **System Status**: Current system health and availability
- **Usage Metrics**: Monthly usage tracking and customer engagement insights
- **Compliance Impact**: Reports preventing potential OSHA fines ($15K-$156K) and EPA penalties

### Recent Reports
- Sortable list of most recent reports with status indicators
- Quick filters by date range, status, and client
- Search functionality for report lookup with IR Pros expertise tags
- Bulk actions for multiple reports
- Compliance risk indicators highlighting potential OSHA/EPA violations prevented

### System Health

### Monitoring Dashboard

- **Infrastructure Metrics**
  - Real-time CPU, memory, and disk usage
  - Network I/O and latency monitoring
  - Database performance and query metrics
  - Cache hit/miss ratios and eviction rates
  - Queue depths and processing times

- **Application Performance**
  - API response times and error rates
  - User session tracking
  - Background job status
  - External service health
  - Custom performance metrics

- **Alerting**
  - Configurable alert thresholds
  - Multiple notification channels
  - Alert escalation policies
  - Alert suppression and snoozing
  - Historical alert analysis

### Maintenance Operations

- **Scheduled Maintenance**
  - Maintenance window configuration
  - Automated backup scheduling
  - Database optimization jobs
  - Cache warming strategies
  - Log rotation and archival

- **System Updates**
  - Version control and release tracking
  - One-click software updates
  - Rollback capabilities
  - Dependency management
  - Update impact analysis

- **Data Management**
  - On-demand and scheduled backups
  - Point-in-time recovery
  - Data export/import tools
  - Data anonymization for testing
  - Storage optimization recommendations

### Quick Actions

- Create new user accounts
- Generate reports
- System maintenance tasks
- Clear caches
- View error logs

## User Management

### User Administration

- **Account Management**
  - Create, view, edit, and deactivate app-level profiles; identity lifecycle (creation, disablement, password policies) is managed in Entra ID
  - Manage application role assignments via Entra App Roles or Groups; deny-by-default authorization
  - Bulk import/export user data (CSV/Excel)
  - Set account expiration dates and access schedules per customer policy
  - MFA enforced via Entra Conditional Access (configured in tenant)

- **Access Control**
  - Assign and manage granular roles and permissions
  - Define custom permission sets
  - Set IP restrictions and geofencing rules
  - Configure session timeout policies

- **Audit & Monitoring**
  - View comprehensive user activity logs
  - Monitor login history and access patterns
  - Track password changes and security events
  - Generate user activity reports

### Team Management

- **Team Structure**
  - Create and manage hierarchical team structures
  - Define team leads and reporting lines
  - Set up approval workflows based on team hierarchy
  - Configure team-specific settings and defaults

- **Access Management**
  - Assign users to multiple teams with different roles
  - Set team-based access controls
  - Configure cross-team collaboration settings
  - Manage external guest access

- **Analytics**
  - Track team performance metrics
  - Monitor resource utilization by team
  - Generate team activity reports
  - Identify inactive or underutilized teams

## Report Management

### Report Review Interface

- **Report List View**
  - Sortable and filterable grid of all reports
  - Status indicators (Processing, Needs Review, Approved, Delivered)
  - Client and project information
  - Processing timestamps

- **Report Detail View**
  - Side-by-side PDF and analysis results
  - Annotation tools for review notes
  - Approval/Rejection workflow
  - Version history and change tracking

### File Operations
- Generate secure download links
- Export reports in multiple formats (PDF, Excel)
- Batch operations for multiple reports
- Archive processed reports

### Client Communication
- Email notifications for report availability emphasizing IR Pros expertise
- Customizable email templates highlighting compliance value and risk mitigation
- Delivery status tracking with consistent messaging
- Download history and access logs

## Data Management

### Report Data Management

#### Overview
- Secure handling of report data throughout its lifecycle
- Includes management of:
  - Original PDF documents
  - Processed analysis results
  - Generated reports
  - Associated metadata and audit logs

#### Access Control
- Role-based access to report data
- All access attempts are logged
- Sensitive operations require MFA
- Granular permission controls

#### Data Retention Workflow
1. Reports are stored for 1 year by default
2. Automatic archival of reports older than 1 year
3. Secure deletion of archived reports after 3 years
4. All retention actions are logged for compliance

#### Customer Data Deletion
- **Access**: Restricted to Administrator role only
- **Scope**: Removes all customer-identifiable information including:
  - Client contact details
  - Submitted documents
  - Generated reports
  - Associated metadata
- **Process**:
  1. Admin initiates deletion request
  2. System displays summary of data to be removed
  3. MFA verification required
  4. Confirmation screen with final warning
  5. Secure erasure of all specified data
  6. Confirmation and audit log entry
- **Safety Measures**:
  - 30-day grace period for recovery
  - Email notifications for all deletion actions
  - Rate limiting on deletion operations
  - Prevention of mass deletion without proper authorization

#### Security Measures
- End-to-end encryption of all report data
- Regular security audits and access reviews
- Data loss prevention controls
- Comprehensive backup and recovery procedures

### File Repository
  - Centralized view of all system files with advanced filtering
  - Full-text search across file contents and metadata
  - Version control and history tracking
  - Bulk operations with background processing

- **File Operations**
  - Preview files in multiple formats
  - Download original and processed versions
  - Move/copy files between locations
  - Set retention policies and auto-delete rules
  - Apply tags and custom metadata

- **Security & Compliance**
  - Set file access controls and sharing permissions
  - Apply data classification labels
  - Enable/disable file sharing externally
  - View and manage file access history

### File Status Tracking

- **Processing Pipeline**
  - Real-time visualization of file processing status
  - Detailed processing history with timestamps
  - Error classification and severity levels
  - Automated retry mechanisms for failed processes

- **Troubleshooting**
  - Detailed error logs with contextual information
  - Step-by-step processing history
  - System resource utilization during processing
  - Integration with support ticketing system

- **Analytics**
  - Processing time metrics and trends
  - Failure rate analysis
  - Resource usage patterns
  - Performance optimization recommendations

## Reporting & Analytics

### Standard Reports

- **User Activity Reports**
  - Login/logout history and patterns
  - Feature usage statistics
  - Session duration and frequency
  - Failed login attempts and security events

- **System Performance**
  - API response times and success rates
  - Resource utilization metrics
  - Processing queue status and backlogs
  - System uptime and availability

- **Content Analysis**
  - File upload and processing volumes
  - Storage usage trends
  - File type distribution
  - Processing time benchmarks

### Custom Reports

- **Report Builder**
  - Drag-and-drop interface for report creation
  - Customizable data visualizations (charts, graphs, tables)
  - Conditional formatting and data highlighting
  - Save and reuse report templates

- **Automation**
  - Schedule report generation and delivery
  - Set up automated data exports
  - Configure report subscriptions
  - Alert-based reporting for threshold breaches

- **Sharing & Collaboration**
  - Share reports with specific users or teams
  - Set report access permissions
  - Comment and annotate reports
  - Version control for report templates

## Notification System

### Email Notifications

- **Notification Types**
  - System alerts and critical warnings
  - User activity and security events
  - Scheduled report delivery confirmations
  - Account and access management updates
  - System maintenance announcements

- **Configuration**
  - Customizable email templates with variables
  - HTML and plain text support
  - Sender name and email configuration
  - Rate limiting and throttling controls
  - Delivery status tracking

### In-App Notifications

- **Real-Time Alerts**
  - Toast notifications for immediate feedback
  - Priority-based notification display
  - Action buttons for quick responses
  - Dismissible and persistent notification options
  - Notification grouping and categorization

- **Management**
  - Centralized notification center
  - Mark as read/unread
  - Bulk actions for multiple notifications
  - Notification filtering and search
  - User-specific notification preferences

- **Audit Trail**
  - Historical notification archive
  - Delivery status tracking
  - User interaction logging
  - Export notification history

## System Configuration

### General Settings

- **Application Preferences**
  - Configure system name, logo, and favicon
  - Set default timezone and date/time formats
  - Configure system-wide notifications
  - Define maintenance windows and schedules

- **Branding & Theming**
  - Custom color schemes and CSS overrides
  - White-labeling options
  - Custom email templates
  - Multi-language support and localization

- **Security Settings**
  - Password policies and complexity requirements
  - Session timeout configurations
  - IP whitelisting/blacklisting
  - Audit log retention policies

### API Management

- **API Gateway**
  - Generate and revoke API keys
  - Set rate limits and quotas
  - Monitor API usage in real-time
  - Configure IP restrictions for API access

- **Webhook Configuration**
  - Set up outbound webhooks for system events
  - Configure retry policies and error handling
  - Monitor webhook delivery status
  - View webhook event history

- **Integration Management**
  - Configure third-party service connections
  - Set up OAuth clients and credentials
  - Manage API documentation access
  - Monitor integration health and status

#### API Usage & Budget Alerts

- **Budgets & Thresholds**
  - Set monthly budget (currency) and daily/monthly thresholds: Warning (e.g., 70%), Critical (e.g., 90%), Breach (100%+)
  - Per-endpoint and global threshold support
  - Forecast-to-month-end calculation displayed alongside current MTD usage

- **Notification Channels**
  - Email recipients (multiple)
  - Webhook URL(s) for external automation
  - Send test alert to validate delivery and formatting

- **Hard Caps & Overrides**
  - Optional hard cap behavior when budget is reached:
    - Pause non-essential background jobs
    - Reject new analysis requests with friendly in-app message
    - Immediate admin notification with one-click temporary override
  - Cap grace window and cooldown configuration

- **Escalation & Noise Control**
  - Escalation rules if critical persists > N hours or forecast exceeds budget by > X%
  - De-duplication and minimum alert interval settings to prevent alert storms

- **Audit & Security**
  - All configuration changes logged with who/when/what
  - Alert deliveries logged with channel, payload summary, and status
  - RBAC: Only Administrator role can modify budgets/caps; Auditor can view

- **Dashboard Widgets**
  - Current usage, MTD spend estimate, and forecast vs. budget
  - Top endpoints by usage/cost with trend arrows
  - Recent alerts and escalations timeline

### Integration Management

### Third-Party Integrations

- **Available Integrations**
  - CRM systems (Salesforce, HubSpot, etc.)
  - Support ticketing platforms (Zendesk, Freshdesk)
  - Analytics and BI tools (Power BI, Tableau)
  - Cloud storage providers (Azure Blob, AWS S3, Google Cloud Storage)
  - Communication tools (Slack, Microsoft Teams)

- **Integration Setup**
  - Step-by-step integration wizards
  - OAuth 2.0 and API key authentication
  - Field mapping and transformation
  - Test connection functionality
  - Integration health monitoring

### API Documentation

- **Interactive Console**
  - Try-it-now functionality
  - Authentication token generator
  - Request/response inspector
  - Code samples in multiple languages
  - Error simulation and handling examples

- **Reference Documentation**
  - Comprehensive endpoint documentation
  - Request/response schemas
  - Authentication requirements
  - Rate limiting and quotas
  - Versioning and deprecation policies

- **SDK & Libraries**
  - API security controls
  - Web application firewall (WAF) rules
  - DDoS protection settings
  - Network segmentation policies

## Audit & Compliance

### Audit Logs

- **Comprehensive Logging**
  - Detailed user activity tracking with timestamps
  - System configuration changes
  - Data access and modification events
  - Authentication and authorization events
  - Administrative actions and changes

- **Log Management**
  - Centralized log collection and storage
  - Configurable retention policies
  - Automated log rotation and archival
  - Secure log access controls
  - Export logs in multiple formats (JSON, CSV, Syslog)

- **Search & Analysis**
  - Advanced search with filters and queries
  - Correlation of related events
  - Anomaly detection
  - Custom log views and dashboards
  - Scheduled log analysis reports

### Compliance Reporting

- **Regulatory Compliance**
  - GDPR compliance dashboard
  - Data subject access request handling
  - Right to be forgotten implementation
  - Data protection impact assessments
  - Compliance status reporting

- **Policies & Procedures**
  - Documented data retention policies
  - Access control review processes
  - Incident response procedures
  - Data breach notification workflows
  - Compliance training materials

- **Certifications & Attestations**
  - Compliance certification tracking
  - Third-party audit reports
  - Penetration test results
  - Security assessment documentation
  - Compliance calendar and deadlines

## Help & Support

### Documentation

- **User Documentation**
  - Comprehensive admin user guide
  - Step-by-step tutorials
  - Video demonstrations
  - Best practices and recommendations
  - Release notes and changelog

- **Technical Documentation**
  - API reference documentation
  - Integration guides
  - System architecture overview
  - Deployment guides
  - Troubleshooting and known issues

- **Training Resources**
  - Onboarding materials
  - Training videos and webinars
  - Certification programs
  - Knowledge base articles
  - Community forums and discussions

### Support

- **Support Channels**
  - In-app help center
  - Email support with ticket tracking
  - Live chat with support agents
  - Scheduled screen sharing sessions
  - Phone support for critical issues

- **Self-Service**
  - Interactive troubleshooting wizards
  - Community-powered support forums
  - Solution database with search
  - Automated diagnostics tools
  - System health check utilities

- **Feedback & Improvement**
  - Feature request tracking
  - Bug reporting and prioritization
  - User feedback collection
  - Customer satisfaction surveys
  - Product roadmap visibility

## Conclusion

This comprehensive Admin UI specification for the IR Pros P&ID Estimator provides a detailed blueprint for building a robust, secure, and user-friendly administration interface for a unified SaaS platform while maintaining IR Pros' industry authority. The design emphasizes:

- **Efficiency**: Streamlined workflows optimized for operational excellence and user productivity
- **Security**: Enterprise-grade security controls meeting industrial refrigeration compliance standards
- **Insight**: Comprehensive analytics for platform usage and compliance impact measurement
- **Scalability**: Architecture designed to scale to customers of all sizes
- **Authority**: Interface design that reinforces IR Pros' position as the trusted industry expert

The Admin UI serves as the central control panel for managing all aspects of the IR Pros P&ID Estimator platform, from user management and content oversight to system configuration and security administration. Its intuitive design and powerful features ensure that administrators can effectively support end-users while maintaining system integrity and performance.

## Next Steps

1. Review and finalize the specification with key stakeholders
2. Create high-fidelity mockups for key workflows
3. Develop a phased implementation plan
4. Establish testing and quality assurance protocols
5. Plan administrator training and documentation

## Version History

| Version | Date       | Author          | Description of Changes                 |
|---------|------------|-----------------|----------------------------------------|
| 1.0     | 2023-11-15 | Cascade AI      | Initial version                        |
| 1.1     | 2023-11-15 | Cascade AI      | Enhanced with detailed specifications  |
| 1.2     | 2023-11-15 | Cascade AI      | Added security and compliance sections |

## Approval

| Role          | Name        | Signature | Date       |
|---------------|-------------|-----------|------------|
| Product Owner |             |           |            |
| Tech Lead     |             |           |            |
| Security Lead |             |           |            |

## Future Enhancements

### Advanced Analytics
- AI-powered insights and recommendations
- Predictive analytics for system performance
- User behavior analysis
- Anomaly detection in system usage

### Mobile Admin Application
- Native mobile app for system monitoring
- Push notifications for critical alerts
- Basic administration tasks on-the-go
- Offline access to key metrics

### Automation & AI
- Automated system optimization
- Intelligent alert correlation
- Self-healing capabilities
- Chatbot for admin assistance

### Integration Expansion
- Additional third-party service connectors
- Webhook templates for common integrations
- API gateway for custom integrations
- Marketplace for admin extensions

## Glossary

| Term | Definition |
|------|------------|
| RBAC | Role-Based Access Control - A method of regulating access to resources based on the roles of individual users |
| MFA  | Multi-Factor Authentication - A security system that requires multiple methods of authentication |
| GDPR | General Data Protection Regulation - EU regulation on data protection and privacy |
| SSO  | Single Sign-On - An authentication scheme that allows a user to log in with a single ID and password |
| WAF  | Web Application Firewall - A security measure that monitors and filters HTTP traffic |

## Future Enhancements

### Advanced Analytics
- AI-powered insights and recommendations
- Predictive analytics for system performance
- User behavior analysis
- Anomaly detection in system usage

### Mobile Admin Application
- Native mobile app for system monitoring
- Push notifications for critical alerts
- Basic administration tasks on-the-go
- Offline access to key metrics

### Automation & AI
- Automated system optimization
- Intelligent alert correlation
- Self-healing capabilities
- Chatbot for admin assistance

### Integration Expansion
- Additional third-party service connectors
- Webhook templates for common integrations
- API gateway for custom integrations
- Marketplace for admin extensions