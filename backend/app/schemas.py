from marshmallow import Schema, fields, validate

class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True, validate=validate.Length(min=2, max=100))
    email = fields.Email(required=True)
    phone = fields.Str(required=True, validate=validate.Length(min=10, max=15))
    created_at = fields.DateTime(dump_only=True)

class JobSchema(Schema):
    id = fields.Int(dump_only=True)
    title = fields.Str(required=True, validate=validate.Length(min=5, max=200))
    description = fields.Str(required=True, validate=validate.Length(min=10))
    company = fields.Str(required=True, validate=validate.Length(min=2, max=100))
    location = fields.Str(required=True, validate=validate.Length(min=2, max=100))
    salary = fields.Int(required=True, validate=validate.Range(min=10000, error='Salary must be at least KES 10,000'))
    created_at = fields.DateTime(dump_only=True)

class ApplicationSchema(Schema):
    id = fields.Int(dump_only=True)
    user_id = fields.Int(required=True)
    job_id = fields.Int(required=True)
    cover_letter = fields.Str(required=True, validate=validate.Length(min=50))
    status = fields.Str(dump_only=True)
    applied_at = fields.DateTime(dump_only=True)
    user = fields.Nested(UserSchema, dump_only=True)
    job = fields.Nested(JobSchema, dump_only=True)