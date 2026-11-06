# FIXIGO --- Software Requirements Specification

**Product:** FIXIGO\
**Tagline:** Right Place. Right Skill. Right Time.\
**Document type:** Product and Software Requirements Specification
(SRS)\
**Version:** 1.0\
**Status:** Proposed requirements baseline\
**Date:** 5 November 2026

------------------------------------------------------------------------

## 1. Introduction

### 1.1 Purpose

This document defines the functional and non-functional requirements for
FIXIGO, an AI-powered workforce intelligence and service coordination
platform. It is intended to guide product planning, UI/UX design, system
architecture, database design, implementation, testing, and pilot
deployment.

### 1.2 Product vision

FIXIGO aims to bridge the gap between customers who need local services
and skilled workers operating in fragmented, largely unorganized service
markets. It will help customers describe a problem naturally, identify
the skills required, discover suitable workers, understand expected
costs, and coordinate the service through completion.

FIXIGO is intended to be more than a conventional service-booking
directory. Its central capability is an intelligence and coordination
layer that connects the right customer requirement with an appropriately
skilled, available, and suitable worker.

### 1.3 Objectives

-   Reduce the effort required to discover an appropriate local service
    professional.
-   Improve the accuracy of matching between job requirements and worker
    capabilities.
-   Make estimates, quotations, and additional charges more transparent.
-   Give workers a digital professional identity and better access to
    relevant work.
-   Coordinate the service lifecycle from request creation to completion
    and feedback.
-   Build a trustworthy record of worker skills, work history, and
    service outcomes.
-   Use service activity data to improve matching and operational
    decisions over time.

### 1.4 Scope

The platform is planned to include:

1.  Customer application.
2.  Worker application or worker-facing experience.
3.  Administrative and operations dashboard.
4.  Backend APIs and data services.
5.  AI request-understanding and worker-matching capabilities.
6.  Booking, quotation, payment-record, communication, and feedback
    workflows.
7.  Operational analytics and future workforce intelligence
    capabilities.

The first release should prove the core service journey in a controlled
geographical area. Advanced forecasting, extensive institutional
integrations, and nationwide expansion are not prerequisites for the
initial MVP.

### 1.5 Definitions

  -----------------------------------------------------------------------
  Term                                Meaning
  ----------------------------------- -----------------------------------
  Customer                            A person or organization requesting
                                      a service.

  Worker                              A service professional who
                                      registers skills and accepts
                                      suitable jobs.

  Service request                     A customer's description of a
                                      problem or required service.

  Skill                               A defined capability associated
                                      with a service category.

  Match                               A worker recommendation produced
                                      from eligibility checks and
                                      ranking.

  Booking                             A confirmed service engagement
                                      between a customer and worker.

  Quotation                           An itemized estimate or proposed
                                      charge for a service.

  AI analysis                         Structured interpretation of a
                                      customer's request by AI
                                      components.

  MVP                                 Minimum Viable Product: the
                                      smallest release that validates the
                                      core service journey.
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 2. Stakeholders and User Classes

### 2.1 Customers

Customers use FIXIGO to: - Register and manage their account. - Submit
service requests through text and, where supported, voice or images. -
Answer AI-guided clarification questions. - Review suitable workers and
compare relevant information. - Approve a quotation and manage a
booking. - Communicate with the worker and follow job progress. - Record
payment information, provide feedback, and raise complaints.

### 2.2 Workers

Workers use FIXIGO to: - Register and create a professional profile. -
Declare skills, experience, service areas, and availability. - Submit
identity, qualification, and skill documents for review. - Receive
relevant job opportunities. - Accept or decline work voluntarily. -
Communicate with customers and update job status. - Submit quotations
within platform pricing rules. - Review completed work, earnings,
ratings, and performance information.

### 2.3 Administrators and operations staff

Administrators use FIXIGO to: - Manage customer and worker accounts. -
Review worker verification submissions. - Maintain service categories
and skill definitions. - Monitor requests, matches, bookings, and
transactions. - Oversee pricing rules and quotation disputes. - Handle
complaints, disputes, cancellations, and refunds. - Review fraud and
suspicious-activity reports. - Monitor platform performance and local
service demand.

### 2.4 External stakeholders

Potential external stakeholders include payment providers, map and
geolocation providers, notification providers, vocational training
institutions, and authorized worker-verification or employment-related
institutions. Any institutional integration is subject to technical
availability, authorization, agreements, and applicable law.

------------------------------------------------------------------------

## 3. Product Scope and Release Priorities

### 3.1 MVP scope

The MVP shall prioritize the following capabilities:

1.  Customer registration and authentication.
2.  Worker registration and profile creation.
3.  Worker skill, experience, service-area, and availability management.
4.  Service category and skill taxonomy.
5.  Customer service-request creation.
6.  AI-assisted request understanding and required-skill extraction.
7.  Eligible-worker discovery and ranked matching.
8.  Transparent price estimation or quotation workflow.
9.  Worker job notification and accept/decline workflow.
10. Booking confirmation and status updates.
11. Customer-worker communication.
12. Service completion confirmation.
13. Customer feedback and worker ratings.
14. Admin verification and basic dispute handling.

### 3.2 Later release capabilities

The following capabilities may be introduced after the MVP has been
validated:

-   Voice-first and expanded multimodal request handling.
-   Multilingual AI support across regional languages.
-   Live worker location and arrival tracking.
-   More advanced semantic or embedding-based matching.
-   Predictive maintenance suggestions.
-   Local workforce demand forecasting and locality heatmaps.
-   Skill-gap identification and training recommendations.
-   Advanced service-quality intelligence.
-   Institutional integrations, subject to authorization.
-   B2B workforce and service-management features.
-   Expanded service sectors and geographical coverage.

### 3.3 Initial service categories

The initial pilot may focus on a limited selection of categories such
as:

-   Electrical services.
-   Plumbing.
-   Appliance repair and maintenance.
-   Carpentry and home maintenance.
-   Cleaning and household assistance.
-   Gardening and related property maintenance.
-   General labour, loading, unloading, and moving assistance.
-   Small-business and commercial assistance.

The actual pilot categories should be selected based on local customer
research, worker availability, operational readiness, and safety
requirements.

------------------------------------------------------------------------

## 4. Functional Requirements

Priority labels: - **Must:** Required for the MVP. - **Should:**
Important, but may follow the first MVP release. - **Future:** Planned
enhancement; not required for the MVP.

### 4.1 Account and access management

  -----------------------------------------------------------------------
  ID                      Requirement             Priority
  ----------------------- ----------------------- -----------------------
  FR-001                  The system shall allow  Must
                          customers and workers   
                          to register using       
                          supported account       
                          credentials and contact 
                          details.                

  FR-002                  The system shall        Must
                          authenticate registered 
                          users before allowing   
                          access to protected     
                          account features.       

  FR-003                  The system shall        Must
                          support customer,       
                          worker, and             
                          administrator access    
                          roles.                  

  FR-004                  The system shall allow  Must
                          users to manage         
                          permitted profile       
                          information.            

  FR-005                  The system shall allow  Should
                          users to recover access 
                          through a secure        
                          account-recovery        
                          process.                

  FR-006                  The system shall        Must
                          support account         
                          suspension and status   
                          management by           
                          authorized              
                          administrators.         

  FR-007                  The system shall record Must
                          relevant account        
                          creation and update     
                          timestamps.             
  -----------------------------------------------------------------------

### 4.2 Customer profile and address management

  -----------------------------------------------------------------------
  ID                      Requirement             Priority
  ----------------------- ----------------------- -----------------------
  FR-008                  The system shall allow  Must
                          customers to create and 
                          update their customer   
                          profile.                

  FR-009                  The system shall allow  Must
                          customers to save one   
                          or more service         
                          addresses.              

  FR-010                  The system shall        Must
                          capture location        
                          information required    
                          for service-area        
                          eligibility and         
                          distance estimation,    
                          subject to user         
                          permission.             

  FR-011                  The system should       Should
                          support                 
                          preferred-language      
                          settings.               

  FR-012                  The system shall allow  Must
                          customers to view their 
                          service-request and     
                          booking history.        
  -----------------------------------------------------------------------

### 4.3 Worker onboarding and professional identity

  -----------------------------------------------------------------------
  ID                      Requirement             Priority
  ----------------------- ----------------------- -----------------------
  FR-013                  The system shall allow  Must
                          workers to create a     
                          professional profile.   

  FR-014                  The system shall allow  Must
                          workers to declare      
                          primary and secondary   
                          skills.                 

  FR-015                  The system shall allow  Must
                          workers to provide      
                          experience,             
                          specialization, and     
                          relevant work           
                          information.            

  FR-016                  The system shall allow  Must
                          workers to submit       
                          supported identity,     
                          qualification, and      
                          skill documents.        

  FR-017                  The system shall        Must
                          maintain a verification 
                          status for submitted    
                          documents and worker    
                          profiles.               

  FR-018                  The system shall allow  Must
                          workers to define       
                          service areas.          

  FR-019                  The system shall allow  Must
                          workers to manage       
                          working hours and       
                          availability.           

  FR-020                  The system shall allow  Must
                          workers to accept or    
                          decline job             
                          opportunities.          

  FR-021                  The system should       Should
                          display worker work     
                          history, ratings, and   
                          relevant performance    
                          indicators.             

  FR-022                  The system shall not    Must
                          represent an unverified 
                          document or skill as    
                          verified.               
  -----------------------------------------------------------------------

### 4.4 Service category and skill management

  -----------------------------------------------------------------------
  ID                      Requirement             Priority
  ----------------------- ----------------------- -----------------------
  FR-023                  The system shall        Must
                          maintain service        
                          categories.             

  FR-024                  The system shall        Must
                          maintain skills         
                          associated with service 
                          categories.             

  FR-025                  The system shall        Must
                          associate workers with  
                          one or more skills.     

  FR-026                  The system shall record Must
                          worker proficiency or   
                          experience against a    
                          skill where supplied.   

  FR-027                  Authorized              Must
                          administrators shall be 
                          able to maintain        
                          category and skill      
                          definitions.            
  -----------------------------------------------------------------------

### 4.5 Service request creation

  -----------------------------------------------------------------------
  ID                      Requirement             Priority
  ----------------------- ----------------------- -----------------------
  FR-028                  The system shall allow  Must
                          customers to create a   
                          service request by      
                          describing the problem  
                          or required work.       

  FR-029                  The system shall        Must
                          associate each request  
                          with a customer and     
                          service location.       

  FR-030                  The system shall allow  Must
                          customers to select or  
                          confirm a service       
                          category where          
                          appropriate.            

  FR-031                  The system should allow Should
                          customers to attach     
                          photographs relevant to 
                          the request.            

  FR-032                  The system may support  Should
                          voice input and         
                          speech-to-text request  
                          creation.               

  FR-033                  The system shall allow  Must
                          customers to review and 
                          correct request details 
                          before submission.      

  FR-034                  The system shall record Must
                          request status and      
                          creation time.          

  FR-035                  The system should       Should
                          support scheduling      
                          preferences and urgency 
                          selection.              
  -----------------------------------------------------------------------

### 4.6 AI request understanding

  -----------------------------------------------------------------------
  ID                      Requirement             Priority
  ----------------------- ----------------------- -----------------------
  FR-036                  The AI component shall  Must
                          interpret the           
                          customer's              
                          natural-language        
                          service description.    

  FR-037                  The AI component shall  Must
                          classify the request    
                          into an appropriate     
                          service category when   
                          confidence is           
                          sufficient.             

  FR-038                  The AI component shall  Must
                          identify candidate      
                          skills required to      
                          perform the requested   
                          work.                   

  FR-039                  The AI component should Should
                          estimate job complexity 
                          and urgency.            

  FR-040                  The system should ask   Should
                          clarification questions 
                          when important request  
                          information is missing  
                          or uncertain.           

  FR-041                  The system shall retain Must
                          a confidence or         
                          uncertainty indicator   
                          for AI-generated        
                          analysis where          
                          applicable.             

  FR-042                  The system shall allow  Must
                          a user or authorized    
                          operator to correct     
                          inaccurate AI-generated 
                          request details.        

  FR-043                  The system shall        Must
                          distinguish             
                          customer-reported       
                          symptoms from a         
                          confirmed technical     
                          diagnosis.              

  FR-044                  The AI component should Should
                          support text, image,    
                          and voice inputs as the 
                          relevant capabilities   
                          become available.       

  FR-045                  The system should store Should
                          the AI model or         
                          analysis version used   
                          for an analysis.        
  -----------------------------------------------------------------------

### 4.7 Worker discovery and intelligent matching

  -----------------------------------------------------------------------
  ID                      Requirement             Priority
  ----------------------- ----------------------- -----------------------
  FR-046                  The system shall        Must
                          identify workers whose  
                          registered skills meet  
                          the request's           
                          required-skill          
                          criteria.               

  FR-047                  The system shall filter Must
                          candidates using        
                          relevant eligibility    
                          conditions such as      
                          service area and        
                          availability.           

  FR-048                  The system shall rank   Must
                          eligible workers using  
                          relevant factors such   
                          as skill fit,           
                          experience, distance,   
                          availability,           
                          reliability, and price  
                          compatibility.          

  FR-049                  The system shall retain Should
                          match scores or score   
                          components sufficient   
                          to explain the ranking  
                          internally.             

  FR-050                  The system shall        Must
                          present suitable worker 
                          information to the      
                          customer for            
                          comparison.             

  FR-051                  The system shall notify Must
                          relevant workers about  
                          eligible job            
                          opportunities.          

  FR-052                  The system shall allow  Must
                          workers to accept or    
                          decline opportunities.  

  FR-053                  The system should avoid Must
                          relying exclusively on  
                          popularity or           
                          historical review count 
                          when ranking workers.   

  FR-054                  The system should       Should
                          provide qualified new   
                          workers a fair          
                          opportunity to receive  
                          relevant matches.       

  FR-055                  The system may          Future
                          introduce learned       
                          ranking models after    
                          sufficient reliable     
                          outcome data is         
                          available.              
  -----------------------------------------------------------------------

### 4.8 Pricing and quotations

  -----------------------------------------------------------------------
  ID                      Requirement             Priority
  ----------------------- ----------------------- -----------------------
  FR-056                  The system shall        Must
                          provide an estimate or  
                          quotation workflow      
                          before a customer       
                          commits to a service    
                          where applicable.       

  FR-057                  The pricing process     Must
                          should consider labor,  
                          travel, materials,      
                          complexity, and         
                          permitted urgency       
                          adjustments.            

  FR-058                  The system shall        Must
                          display the cost        
                          components clearly      
                          where an itemized       
                          estimate is available.  

  FR-059                  The system shall allow  Must
                          an authorized worker to 
                          submit a quotation      
                          within configured       
                          platform rules.         

  FR-060                  The system shall record Must
                          quotation status,       
                          amount, and relevant    
                          timestamps.             

  FR-061                  The system shall        Must
                          require customer        
                          approval for a          
                          quotation before        
                          treating it as          
                          accepted.               

  FR-062                  The system shall        Must
                          support approval of     
                          revised or additional   
                          charges before they are 
                          applied.                

  FR-063                  The system shall not    Must
                          allow an AI language    
                          model to independently  
                          commit a final          
                          financial amount        
                          without the platform's  
                          pricing rules and       
                          validation.             

  FR-064                  The system may use      Future
                          local pricing           
                          benchmarks and anomaly  
                          detection when reliable 
                          data becomes available. 
  -----------------------------------------------------------------------

### 4.9 Booking and job coordination

  -----------------------------------------------------------------------
  ID                      Requirement             Priority
  ----------------------- ----------------------- -----------------------
  FR-065                  The system shall create Must
                          a booking after the     
                          required worker and     
                          customer confirmations  
                          are completed.          

  FR-066                  The system shall        Must
                          associate a booking     
                          with its service        
                          request, customer, and  
                          selected worker.        

  FR-067                  The system shall        Must
                          support scheduling and  
                          recording of service    
                          appointment times.      

  FR-068                  The system shall        Must
                          maintain booking status 
                          throughout the service  
                          lifecycle.              

  FR-069                  The system shall        Must
                          support status updates  
                          such as accepted, on    
                          the way, arrived, in    
                          progress, and           
                          completed.              

  FR-070                  The system shall record Must
                          who made a status       
                          update and when it      
                          occurred.               

  FR-071                  The system shall allow  Must
                          customers and workers   
                          to view relevant        
                          booking details.        

  FR-072                  The system should       Should
                          support cancellation    
                          and rescheduling        
                          subject to defined      
                          policies.               

  FR-073                  The system should       Should
                          support customer and    
                          worker completion       
                          confirmation.           

  FR-074                  The system may provide  Future
                          live worker location    
                          and ETA when the worker 
                          and customer have       
                          granted the required    
                          permissions.            
  -----------------------------------------------------------------------

### 4.10 Communication and notifications

  -----------------------------------------------------------------------
  ID                      Requirement             Priority
  ----------------------- ----------------------- -----------------------
  FR-075                  The system shall        Must
                          provide a communication 
                          channel for a customer  
                          and worker associated   
                          with a booking.         

  FR-076                  The system shall        Must
                          identify the sender and 
                          recipient of each       
                          message.                

  FR-077                  The system shall notify Must
                          relevant users about    
                          important request,      
                          match, booking, and     
                          job-status events.      

  FR-078                  The system should       Should
                          support notification    
                          preferences and read    
                          status.                 

  FR-079                  The system should       Should
                          support multilingual    
                          customer and            
                          worker-facing content.  

  FR-080                  The system may support  Future
                          in-app calling or       
                          additional              
                          communication channels  
                          in later releases.      
  -----------------------------------------------------------------------

### 4.11 Payment and financial records

  -----------------------------------------------------------------------
  ID                      Requirement             Priority
  ----------------------- ----------------------- -----------------------
  FR-081                  The system shall record Must
                          the amount and payment  
                          status associated with  
                          a booking.              

  FR-082                  The system should       Should
                          support a suitable      
                          digital payment gateway 
                          integration.            

  FR-083                  The system should       Should
                          support recording       
                          permitted offline       
                          payment methods.        

  FR-084                  The system shall retain Must
                          transaction references  
                          returned by a payment   
                          provider where          
                          applicable.             

  FR-085                  The system should       Should
                          support refunds and     
                          cancellation-related    
                          financial adjustments   
                          according to platform   
                          policy.                 

  FR-086                  The system may support  Future
                          worker payout records   
                          and earnings            
                          dashboards.             
  -----------------------------------------------------------------------

### 4.12 Reviews, complaints, and disputes

  -----------------------------------------------------------------------
  ID                      Requirement             Priority
  ----------------------- ----------------------- -----------------------
  FR-087                  The system shall allow  Must
                          customers to submit     
                          feedback after a        
                          completed service.      

  FR-088                  The system shall        Must
                          associate reviews with  
                          the relevant booking    
                          and reviewer.           

  FR-089                  The system shall allow  Must
                          users to report a       
                          service-related         
                          complaint.              

  FR-090                  The system shall        Must
                          maintain dispute status 
                          and resolution          
                          information.            

  FR-091                  Authorized              Must
                          administrators shall be 
                          able to review and      
                          resolve disputes.       

  FR-092                  The system should       Should
                          support worker feedback 
                          and a two-sided review  
                          process.                

  FR-093                  The system shall        Should
                          provide a process for   
                          reviewing suspected     
                          fraudulent or abusive   
                          reviews.                
  -----------------------------------------------------------------------

### 4.13 Administration and operations

  -----------------------------------------------------------------------
  ID                      Requirement             Priority
  ----------------------- ----------------------- -----------------------
  FR-094                  The system shall        Must
                          provide an              
                          administrative          
                          interface restricted to 
                          authorized users.       

  FR-095                  Administrators shall be Must
                          able to review worker   
                          onboarding and          
                          verification            
                          submissions.            

  FR-096                  Administrators shall be Must
                          able to manage customer 
                          and worker account      
                          status.                 

  FR-097                  Administrators shall be Must
                          able to manage service  
                          categories and skills.  

  FR-098                  Administrators shall be Must
                          able to monitor service 
                          requests, matches,      
                          bookings, and payment   
                          records.                

  FR-099                  Administrators shall be Must
                          able to manage          
                          complaints and          
                          disputes.               

  FR-100                  The system should       Should
                          provide operational     
                          reports for requests,   
                          successful matches,     
                          cancellations,          
                          completions, and worker 
                          activity.               

  FR-101                  The system should       Should
                          record sensitive        
                          administrative actions  
                          in an audit log.        

  FR-102                  The system may provide  Future
                          advanced demand and     
                          workforce analytics in  
                          later releases.         
  -----------------------------------------------------------------------

### 4.14 Advanced workforce intelligence

  ------------------------------------------------------------------------
  ID                      Requirement              Priority
  ----------------------- ------------------------ -----------------------
  FR-103                  The system may analyze   Future
                          historical service       
                          demand to identify local 
                          demand patterns.         

  FR-104                  The system may generate  Future
                          locality-level workforce 
                          demand forecasts when    
                          sufficient data exists.  

  FR-105                  The system may identify  Future
                          skill shortages by       
                          comparing local demand   
                          with available worker    
                          skills and capacity.     

  FR-106                  The system may recommend Future
                          training opportunities   
                          based on identified      
                          skill gaps.              

  FR-107                  The system may identify  Future
                          recurring service        
                          patterns and generate    
                          preventive-maintenance   
                          suggestions where        
                          relevant history and     
                          consent are available.   

  FR-108                  The system may analyze   Future
                          service outcomes to      
                          improve estimates and    
                          matching, subject to     
                          fairness and             
                          human-review safeguards. 
  ------------------------------------------------------------------------

------------------------------------------------------------------------

## 5. External Interface Requirements

### 5.1 User interface

-   The customer experience shall make service-request creation
    straightforward.
-   The worker experience shall make job details, location, quotation,
    and status actions easy to understand.
-   The administrative experience shall prioritize verification queues,
    operational monitoring, and dispute handling.
-   Interfaces shall be responsive and usable on common mobile and
    desktop screen sizes.
-   Important actions shall provide clear success, failure, and
    validation feedback.
-   The platform should be designed for low-bandwidth conditions where
    practical.

### 5.2 API interfaces

The backend shall expose authenticated APIs for the web/PWA clients and
approved integrations. API groups are expected to cover:

-   Authentication and user profiles.
-   Customer addresses.
-   Worker profiles, skills, documents, and availability.
-   Service categories and skill taxonomy.
-   Service requests and media.
-   AI analysis.
-   Worker matching.
-   Quotations and booking management.
-   Job status history.
-   Payment records.
-   Messaging and notifications.
-   Reviews, disputes, and administration.

The exact endpoint names, payloads, and API versioning strategy shall be
specified in the API design document.

### 5.3 Third-party interfaces

Potential integrations include:

-   Map, geocoding, distance, and ETA services.
-   Payment gateway and payout services.
-   Email, SMS, or push-notification providers.
-   Speech-to-text and AI model providers.
-   Object storage for uploaded media and documents.
-   Authorized identity, skill, or employment-related institutional
    systems.

No integration shall be represented as active until access, technical
feasibility, commercial terms, and required permissions have been
confirmed.

------------------------------------------------------------------------

## 6. Non-Functional Requirements

### 6.1 Security

  -----------------------------------------------------------------------
  ID                                  Requirement
  ----------------------------------- -----------------------------------
  NFR-001                             All protected operations shall
                                      require authenticated access.

  NFR-002                             The system shall enforce role-based
                                      authorization on the backend, not
                                      only in the user interface.

  NFR-003                             Sensitive data shall be protected
                                      in transit and at rest using
                                      appropriate security controls.

  NFR-004                             Passwords shall be stored using a
                                      secure password-hashing mechanism
                                      or delegated to a trusted
                                      authentication provider.

  NFR-005                             Administrative and sensitive
                                      account actions shall be logged.

  NFR-006                             Uploaded identity documents and
                                      private media shall not be publicly
                                      accessible by default.

  NFR-007                             The system shall apply rate limits
                                      and abuse controls to sensitive
                                      endpoints.

  NFR-008                             Secrets and private API keys shall
                                      be kept out of source code and
                                      client-side bundles.
  -----------------------------------------------------------------------

### 6.2 Privacy and data protection

  -----------------------------------------------------------------------
  ID                                  Requirement
  ----------------------------------- -----------------------------------
  NFR-009                             The platform shall collect personal
                                      data only for defined and necessary
                                      purposes.

  NFR-010                             The platform shall provide clear
                                      privacy information and obtain
                                      required consent.

  NFR-011                             Location collection and sharing
                                      shall be permission-based and
                                      limited to the relevant service
                                      purpose.

  NFR-012                             The platform shall define data
                                      retention and deletion procedures.

  NFR-013                             Identity, financial, address,
                                      location, and document data shall
                                      have restricted access.

  NFR-014                             The platform shall avoid
                                      unnecessary collection or storage
                                      of Aadhaar data.

  NFR-015                             Applicable Indian data-protection
                                      and other legal requirements shall
                                      be reviewed with qualified
                                      professionals before launch.
  -----------------------------------------------------------------------

### 6.3 Reliability and availability

-   The system should handle temporary network interruptions without
    silently losing user-submitted information.
-   Critical booking and payment-record operations shall be protected
    against duplicate submissions.
-   The system should maintain consistent booking and payment states.
-   Errors from external providers shall be handled gracefully.
-   Database backups and recovery procedures shall be defined before
    production deployment.

### 6.4 Performance

-   Common user actions should complete within an acceptable response
    time under the expected pilot load.
-   Long-running AI analysis should provide a clear processing state.
-   Matching operations should return results within a target agreed
    during performance testing.
-   Database queries used for matching, booking lookup, and worker
    availability shall be indexed appropriately.
-   Performance targets shall be finalized after the expected pilot
    traffic and deployment environment are known.

### 6.5 Usability and accessibility

-   The system shall use clear, consistent terminology.
-   Forms shall provide understandable validation messages.
-   Core customer and worker workflows should require minimal
    unnecessary steps.
-   The platform should support regional-language content as it is
    introduced.
-   Interfaces should consider users with varying levels of digital
    literacy.

### 6.6 Scalability and maintainability

-   The initial backend should use a modular architecture with clear
    domain boundaries.
-   The system should support adding service categories, skills,
    localities, and workers without major redesign.
-   APIs and database migrations shall be version-controlled.
-   The application shall include automated tests for critical business
    rules.
-   The architecture should allow AI models and external providers to be
    changed without rewriting the entire application.

### 6.7 Fairness and explainability

-   Worker matching shall consider relevant job criteria rather than
    popularity alone.
-   New workers shall not be automatically excluded solely because they
    have fewer reviews.
-   Match factors should be inspectable by authorized operators.
-   The platform should monitor for systematic ranking or review-related
    unfairness.
-   AI-generated conclusions shall be treated as recommendations where
    human confirmation is needed.

### 6.8 Safety

-   High-risk or uncertain jobs should be routed to appropriately
    qualified professionals.
-   The system shall not treat an AI-generated diagnosis as a confirmed
    technical assessment.
-   Worker and customer safety concerns shall have a reporting and
    escalation process.
-   Verification status and qualification claims shall be displayed
    accurately.

------------------------------------------------------------------------

## 7. Data Requirements

### 7.1 Core logical entities

The initial relational data model is expected to include:

1.  USER_ACCOUNT
2.  CUSTOMER_PROFILE
3.  WORKER_PROFILE
4.  ADDRESS
5.  SERVICE_CATEGORY
6.  SKILL
7.  WORKER_SKILL
8.  WORKER_DOCUMENT
9.  AVAILABILITY_SLOT
10. SERVICE_REQUEST
11. REQUEST_MEDIA
12. AI_ANALYSIS
13. REQUEST_SKILL
14. MATCH_RESULT
15. BOOKING
16. QUOTATION
17. QUOTATION_ITEM
18. JOB_STATUS_HISTORY
19. PAYMENT
20. REVIEW
21. MESSAGE
22. NOTIFICATION
23. DISPUTE

### 7.2 Data integrity

-   Every foreign key shall reference a valid parent record.
-   Required fields shall be non-null.
-   Unique constraints shall be applied to appropriate account
    identifiers and relationship pairs.
-   Monetary values shall use suitable fixed-precision numeric types.
-   Timestamps shall be stored consistently, preferably in UTC, and
    displayed in the user's relevant local time.
-   Status values shall be constrained to defined states.
-   Historical records needed for audit, financial reconciliation, or
    dispute resolution shall not be casually overwritten.

### 7.3 Data ownership and access

-   Customers shall access their own profiles, addresses, requests, and
    bookings.
-   Workers shall access their own profiles, documents, availability,
    opportunities, and relevant bookings.
-   Customers and workers shall access only the booking-related
    communication and information permitted for their role.
-   Administrators shall access operational data according to assigned
    permissions.
-   Sensitive documents and financial details shall have stricter access
    controls than ordinary profile information.

### 7.4 Future data entities

Depending on product evolution, later versions may add:

-   USER_ROLE and role-assignment tables.
-   SERVICE_AREA.
-   PRICING_RULE and pricing-rule version history.
-   QUOTATION_APPROVAL_HISTORY.
-   REFUND and WORKER_PAYOUT.
-   AUDIT_LOG.
-   AI_MODEL_VERSION.
-   INSTITUTION and authorized verification records.
-   TRAINING_PROGRAM and WORKER_TRAINING.
-   CONVERSATION, if messaging is required outside a booking.
-   DEMAND_ANALYTICS.

------------------------------------------------------------------------

## 8. Proposed Technical Architecture

The following stack is the proposed implementation direction, not a
claim that these components have already been deployed.

  -----------------------------------------------------------------------
  Layer                   Proposed technology     Responsibility
  ----------------------- ----------------------- -----------------------
  Frontend                Next.js, TypeScript     Customer, worker, and
                                                  admin interfaces

  Styling                 Tailwind CSS            Responsive UI styling

  Motion                  Framer Motion           Interface transitions
                                                  and interaction
                                                  feedback

  Client delivery         Progressive Web App     Mobile-friendly
                          (PWA)                   installation and access

  Backend                 Python, FastAPI         Business logic and API
                                                  services

  Database                PostgreSQL / Supabase   Persistent relational
                                                  data

  Authentication          Supabase Auth or        User authentication
                          equivalent              

  File storage            Supabase Storage or     Request media and
                          equivalent              worker documents

  Realtime                Supabase Realtime or    Relevant live updates
                          equivalent              

  Cache and coordination  Redis                   Temporary availability
                                                  data, caching, queues,
                                                  rate limiting, and
                                                  coordination

  AI                      LLMs, vision-language   Request understanding
                          models, speech-to-text, and intelligence
                          embeddings,             features
                          classification          

  Maps                    Map/geolocation         Geocoding, distance,
                          provider                routing, and ETA

  Payments                Suitable payment        Digital payment
                          gateway                 processing

  Notifications           Push, SMS, or email     User notifications
                          provider                
  -----------------------------------------------------------------------

### 8.1 Architecture approach

The initial release should use a modular monolith rather than
prematurely splitting the system into microservices. Suggested backend
modules:

-   Identity and access.
-   Customer management.
-   Worker management.
-   Skill and category management.
-   Service requests.
-   AI analysis.
-   Matching.
-   Pricing and quotations.
-   Booking and job lifecycle.
-   Payments.
-   Messaging and notifications.
-   Reviews and disputes.
-   Administration and analytics.

PostgreSQL should remain the source of truth for persistent business
records. Redis should be used for temporary or coordination workloads,
not as the only store for critical booking or financial records.

### 8.2 AI architecture principles

-   Separate request parsing from final business decisions.
-   Validate AI outputs against known categories, skills, and platform
    rules.
-   Store confidence and model-version information where relevant.
-   Ask for clarification when information is insufficient.
-   Keep pricing calculations deterministic and bounded.
-   Retain human review or escalation for uncertain, sensitive, or
    high-risk cases.
-   Evaluate matching quality using real service outcomes before
    adopting learned ranking models.

------------------------------------------------------------------------

## 9. Core Business Workflows

### 9.1 Customer service journey

1.  Customer registers or signs in.
2.  Customer enters a problem description and service location.
3.  Customer optionally uploads relevant images or uses supported voice
    input.
4.  AI interprets the request and identifies a likely category and
    required skills.
5.  The system asks clarification questions if necessary.
6.  The customer confirms the structured request.
7.  The system identifies eligible workers and ranks suitable
    candidates.
8.  The customer reviews worker options and relevant estimate
    information.
9.  A worker receives and accepts the opportunity.
10. The customer confirms the booking and quotation.
11. The worker performs the service and updates job status.
12. The service is marked completed after the required confirmation.
13. Payment status is recorded.
14. The customer submits feedback and may report an issue.

### 9.2 Worker journey

1.  Worker registers and creates a profile.
2.  Worker enters skills, experience, service areas, and availability.
3.  Worker submits required documents.
4.  Verification is reviewed and status is updated.
5.  Worker receives relevant job opportunities.
6.  Worker reviews the job and accepts or declines.
7.  Worker coordinates with the customer.
8.  Worker provides or confirms a quotation under platform rules.
9.  Worker updates job progress.
10. Worker completes the job and reviews relevant history and earnings
    information.

### 9.3 Administrative journey

1.  Administrator signs in with authorized access.
2.  Administrator reviews worker profiles and verification submissions.
3.  Administrator maintains categories and skills.
4.  Administrator monitors service requests, matches, and bookings.
5.  Administrator reviews pricing exceptions and reported issues.
6.  Administrator resolves disputes and records decisions.
7.  Administrator reviews operational metrics and platform activity.

------------------------------------------------------------------------

## 10. Matching and Pricing Rules

### 10.1 Matching inputs

The initial matching process should consider:

-   Required skill compatibility.
-   Worker proficiency and relevant experience.
-   Service-area eligibility.
-   Distance or estimated travel time.
-   Availability at the requested time.
-   Reliability and relevant completed-job history.
-   Customer budget or price compatibility, where provided.
-   Workload and fair opportunity for qualified new workers.

### 10.2 Matching approach

For the MVP, use eligibility filters followed by a transparent weighted
scoring method. Keep score components available for evaluation and
operational review. Do not claim that the ranking is an advanced
machine-learning model unless such a model has been trained, evaluated,
and deployed.

### 10.3 Pricing inputs

The pricing engine may consider:

-   Labor estimate.
-   Travel cost.
-   Materials or parts.
-   Job complexity.
-   Permitted urgency adjustment.
-   Applicable platform rules and price bounds.

AI may interpret the request and help estimate job characteristics. The
final calculation should be validated by deterministic platform logic.
Customers must be informed of and approve revised or additional charges
before they are applied.

------------------------------------------------------------------------

## 11. Constraints, Assumptions, and Dependencies

### 11.1 Constraints

-   The quality of matching depends on accurate worker skills,
    availability, service areas, and request details.
-   Location and ETA accuracy depend on device permissions and
    third-party map services.
-   AI interpretation can be uncertain and must support correction or
    clarification.
-   Payment processing depends on a selected provider and its
    eligibility, fees, and integration requirements.
-   Institutional verification depends on formal authorization and
    technical access.
-   The initial pilot has limited geographical and operational capacity.

### 11.2 Assumptions

-   Customers and workers have access to a supported internet-connected
    device for core online workflows.
-   Workers are willing to maintain accurate profiles and availability.
-   Customers can provide enough information to identify the general
    service need.
-   The pilot will begin with a controlled number of service categories
    and localities.
-   Platform policies for cancellations, disputes, quotations, and
    payments will be defined before public launch.

### 11.3 Dependencies

-   Hosting and database infrastructure.
-   Authentication and secure file storage.
-   AI model access and inference capacity.
-   Map and geolocation services.
-   Notification services.
-   Payment provider approval and integration.
-   Legal, accounting, and operational advice.
-   Local worker onboarding and customer acquisition.

------------------------------------------------------------------------

## 12. Acceptance Criteria for the MVP

The MVP should not be considered validated merely because screens and
APIs exist. It should demonstrate a complete and reliable service
journey.

  -----------------------------------------------------------------------
  ID                                  Acceptance criterion
  ----------------------------------- -----------------------------------
  AC-001                              A customer can register and sign
                                      in.

  AC-002                              A worker can register and create a
                                      profile with skills and
                                      availability.

  AC-003                              An administrator can review and
                                      update worker verification status.

  AC-004                              A customer can submit a service
                                      request with a service location and
                                      description.

  AC-005                              The system can produce a structured
                                      request with a category and
                                      candidate skills, or request
                                      clarification when necessary.

  AC-006                              The system can identify eligible
                                      workers using skills, service area,
                                      and availability.

  AC-007                              The system can rank eligible
                                      workers using documented matching
                                      factors.

  AC-008                              A worker can receive, review, and
                                      accept or decline a job
                                      opportunity.

  AC-009                              A customer and worker can complete
                                      the booking-confirmation process.

  AC-010                              A quotation can be presented and
                                      explicitly approved by the
                                      customer.

  AC-011                              The worker can update job progress
                                      and completion status.

  AC-012                              The customer and worker can
                                      communicate through the supported
                                      booking channel.

  AC-013                              The system records payment status
                                      or the agreed offline payment
                                      record.

  AC-014                              A customer can submit a review
                                      after completion.

  AC-015                              An administrator can review and
                                      manage a reported dispute.

  AC-016                              Access controls prevent users from
                                      viewing another user's restricted
                                      personal or booking data.
  -----------------------------------------------------------------------

### 12.1 Pilot measurement

The pilot should measure, rather than assume, the platform's impact.
Suggested metrics:

-   Registered, verified, and active workers.
-   Number of service requests.
-   Eligible matches per request.
-   Successful match rate.
-   Average time to first suitable match.
-   Booking acceptance rate.
-   Job completion and cancellation rates.
-   Repeat-customer rate.
-   Worker utilization and earnings.
-   Estimate-to-final-price variance.
-   Customer and worker satisfaction.
-   Dispute frequency and resolution time.

A controlled local pilot may begin with approximately 90 workers and
3--5 service categories as an indicative planning target, subject to
actual onboarding capacity and local research. This is a planning
assumption, not a committed launch requirement.

------------------------------------------------------------------------

## 13. Testing Requirements

### 13.1 Functional testing

Test account creation, authentication, profiles, worker verification,
service requests, AI analysis, matching, quotations, booking, status
changes, payments, messaging, reviews, and disputes.

### 13.2 Integration testing

Test interactions among: - Frontend and backend APIs. - Backend and
PostgreSQL. - Backend and AI services. - Backend and storage. - Backend
and map services. - Backend and notification services. - Backend and
payment services.

### 13.3 Security testing

Test authorization boundaries, insecure direct-object references, upload
validation, sensitive-data exposure, rate limiting, session handling,
and administrative access.

### 13.4 AI evaluation

Evaluate: - Category classification accuracy. - Required-skill
extraction quality. - Clarification behavior. - Confidence
calibration. - Matching relevance. - Ranking fairness. - Estimate
accuracy against actual service outcomes.

AI evaluation datasets should be reviewed for privacy, consent,
representativeness, and quality.

### 13.5 User acceptance testing

Conduct pilot testing with real customers and workers. Record task
completion, confusion points, failed matches, cancellations, pricing
disagreements, and support requests. Use the findings to prioritize
improvements.

------------------------------------------------------------------------

## 14. Risks and Mitigations

  -----------------------------------------------------------------------
  Risk                    Potential impact        Mitigation
  ----------------------- ----------------------- -----------------------
  Inaccurate worker skill Poor matches and        Verification, evidence,
  information             service failures        reviews, and periodic
                                                  profile updates

  Incomplete customer     Incorrect category or   Clarification questions
  descriptions            skill extraction        and customer
                                                  confirmation

  Low worker availability Unfulfilled requests    Start in a limited
                                                  locality and recruit
                                                  adequate worker
                                                  capacity

  Unclear or disputed     Customer                Itemized quotations and
  pricing                 dissatisfaction         explicit approval for
                                                  changes

  Biased worker ranking   Unfair distribution of  Transparent factors,
                          opportunities           monitoring, and
                                                  new-worker exposure

  AI-generated incorrect  Wrong service           Confidence thresholds,
  interpretation          recommendation          correction, and human
                                                  escalation

  Fraudulent users or     Financial and safety    Verification workflows,
  documents               risks                   reporting, and
                                                  administrative review

  Location or             Privacy and safety      Consent, access
  personal-data misuse    risks                   restrictions,
                                                  minimization, and
                                                  retention controls

  External service outage Interrupted workflows   Graceful failure
                                                  handling and
                                                  operational fallbacks

  Disputes over           Loss of trust           Status history,
  completion or quality                           communication records,
                                                  evidence, and dispute
                                                  resolution
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 15. Legal, Policy, and Operational Readiness

Before public launch, the founders should obtain qualified legal and
accounting advice on applicable requirements, which may include:

-   Indian data protection and privacy obligations.
-   Consumer protection and e-commerce requirements.
-   GST and applicable tax collection or reporting obligations.
-   Worker classification and labour-related obligations.
-   Payment processing, refunds, and financial recordkeeping.
-   Terms of service, privacy policy, consent, and data-retention
    policy.
-   Insurance and worker/customer safety considerations.
-   Agreements and permissions for external or institutional
    integrations.

This document is a product and technical requirements baseline, not
legal advice. The applicability of specific laws and obligations must be
confirmed by qualified professionals.

------------------------------------------------------------------------

## 16. Suggested Development Sequence

### Phase 1 --- Core platform foundation

-   Authentication and roles.
-   Customer and worker profiles.
-   Skills and service categories.
-   Worker verification workflow.
-   Address and service-area handling.

### Phase 2 --- Request and matching engine

-   Service-request workflow.
-   AI request understanding.
-   Required-skill extraction.
-   Worker eligibility filters.
-   Weighted worker ranking.

### Phase 3 --- Booking and service operations

-   Worker notifications and acceptance.
-   Quotations and customer approval.
-   Booking confirmation.
-   Job status history.
-   Customer-worker communication.
-   Completion and feedback.

### Phase 4 --- Operational readiness

-   Admin dashboard.
-   Dispute handling.
-   Payment integration or payment-record workflow.
-   Security and privacy review.
-   Testing and controlled pilot.

### Phase 5 --- Intelligence expansion

-   Multimodal and multilingual enhancements.
-   Live location and ETA.
-   Improved matching models.
-   Demand forecasting and skill-gap analysis.
-   Preventive maintenance and B2B capabilities.

------------------------------------------------------------------------

## 17. Open Decisions

The following decisions must be finalized during product and technical
planning:

1.  Exact pilot locality and launch service categories.
2.  Whether customers can receive multiple worker quotations before
    selecting one.
3.  Whether a request can result in multiple booking attempts or only
    one confirmed booking.
4.  Cancellation, rescheduling, no-show, and refund policies.
5.  Payment gateway and whether offline payments are supported at
    launch.
6.  Worker verification levels and acceptable evidence for each skill.
7.  Whether messaging is available only after a booking or earlier in
    the request process.
8.  Exact matching weights and eligibility rules.
9.  Location-sharing behavior and retention period.
10. Initial language support.
11. Required admin roles and approval permissions.
12. Hosting, deployment, backup, and monitoring choices.

------------------------------------------------------------------------

## 18. Conclusion

FIXIGO is designed to make local service discovery and workforce
coordination more intelligent, transparent, and dependable. The MVP
should focus on validating one complete outcome: a customer describes a
real service need, FIXIGO identifies and ranks suitable workers, a
worker accepts the opportunity, both parties agree on the service and
price, and the job is completed with a reliable record and feedback.

The platform should expand into predictive workforce intelligence only
after the foundational marketplace, worker data, service outcomes, and
operational processes are reliable.

**End of document.**
