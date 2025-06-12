// // Events/UserEvents.cs
// using System;

// namespace UserService.Events
// {
//     public class UserCreatedEvent
//     {
//         public Guid UserId { get; set; }
//         public string FirstName { get; set; }
//         public string LastName { get; set; }
//         public string Email { get; set; }
//         public string Role { get; set; }
//         public DateTime CreatedAt { get; set; }
//     }

//     public class UserUpdatedEvent
//     {
//         public Guid UserId { get; set; }
//         public string FirstName { get; set; }
//         public string LastName { get; set; }
//         public string Email { get; set; }
//         public string Role { get; set; }
//         public DateTime UpdatedAt { get; set; }
//     }

//     public class UserDeletedEvent
//     {
//         public Guid UserId { get; set; }
//         public string Email { get; set; }
//         public DateTime DeletedAt { get; set; }
//     }
// }
namespace UserService.Events
{
    public class UserCreatedEvent
    {
        public Guid UserId { get; set; }
        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }

    public class UserUpdatedEvent
    {
        public Guid UserId { get; set; }
        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public DateTime UpdatedAt { get; set; }
    }

    public class UserDeletedEvent
    {
        public Guid UserId { get; set; }
        public DateTime DeletedAt { get; set; }
    }
}