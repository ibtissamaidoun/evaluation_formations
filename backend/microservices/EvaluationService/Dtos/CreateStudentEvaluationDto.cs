using System.Collections.Generic;

namespace EvaluationService.Dtos
{
    public class CreateStudentEvaluationDto
{
        public int EvaluationTypeId { get; set; } = 4; 
        public int StudentId { get; set; }            
        public int UserId { get; set; }    
        public float NoteGlobale { get; set; }   
        public int ModuleId {get; set;}        
        public string? Commentaire { get; set; }
        
        public List<ReponseDto> Reponses { get; set; } = new();
    }

}
