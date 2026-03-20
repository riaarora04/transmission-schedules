using {transmission.schedules as db} from '../db/schema';

service ScheduleService @(path: '/schedule') {
  @odata.draft.enabled
  entity Schedules as projection on db.Schedules;

  entity ScheduleStatus as projection on db.ScheduleStatus;
  entity ScheduleCategory as projection on db.ScheduleCategory;
  entity IssueType as projection on db.IssueType;
  entity Frequency as projection on db.Frequency;
  entity Priority as projection on db.Priority;
  entity TransmissionType as projection on db.TransmissionType;
}
