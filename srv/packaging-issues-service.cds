using {packaging.issues as db} from '../db/packaging-issues-schema';

service PackagingIssuesService {
    entity PackagingIssues        as projection on db.PackagingIssues;
    entity IssueCategories        as projection on db.IssueCategories;
    entity IssueStatuses          as projection on db.IssueStatuses;
    entity IssuePriorities        as projection on db.IssuePriorities;
    entity InquirySubcategories   as projection on db.InquirySubcategories;
    entity DifferenceTypes        as projection on db.DifferenceTypes;
    entity MissingDocumentTypes   as projection on db.MissingDocumentTypes;

    // Actions for approve/reject
    action approveIssues(issueIds : array of String) returns String;
    action rejectIssues(issueIds : array of String, reason : String) returns String;
}
