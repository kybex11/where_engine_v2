export interface ProjectStruct {
    _project_name: string,
    _project_type: string,
    _template: string 
};

export function templates(type: string) {
    if (type == 'two') {
        return [
            {
               name: '',
               description: '',
               icon: '',
               path: ''
           },
           {
               name: '',
               description: '',
               icon: '',
               path: ''
           }   
           ];
    } else if (type == 'three') {
        return [
         {
            name: '',
            description: '',
            icon: '',
            path: ''
        },
        {
            name: '',
            description: '',
            icon: '',
            path: ''
        }   
        ];
    } else if (type == 'tilemap') {
        return [
            {
               name: '',
               description: '',
               icon: '',
               path: ''
           },
           {
               name: '',
               description: '',
               icon: '',
               path: ''
           }   
           ];
    } else {
        return [
            {
               name: '',
               description: '',
               icon: '',
               path: ''
           },
           {
               name: '',
               description: '',
               icon: '',
               path: ''
           }   
           ];
    }
}