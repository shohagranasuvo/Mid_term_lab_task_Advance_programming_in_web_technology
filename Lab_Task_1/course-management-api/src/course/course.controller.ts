import { Controller,Get, Param,Patch,Post,Put,Delete} from '@nestjs/common';
import { CourseService } from './course.service.js';

@Controller('course')
export class CourseController {
    constructor(private readonly courseService : CourseService){}

    @Get()
    getAllCourse():string {

        return this.courseService.getAllCourses() ;

    }

    @Get(':id')
    getCOurseWithId(@Param('id')id :string){
        return this.courseService.getCourseById(id)
    }
    @Post()
    CreateCourse():string{
        return this.courseService.createCourse()
    }

    @Put(':id')
    UpdateCourse(@Param('id')id :string)
    {
        return this.courseService.updateCourse(id)
    }


    @Patch(':id')
    PatchCourse(@Param('id')id:string){
        return this.courseService.patchCourse(id)
    }

    @Delete(':id')
    DeleteCourseByitId(@Param('id')id :string){
        return this.courseService.deleteCourse(id)
    }




}
