export interface ProjectStruct {
    projectName: string,
    projectType: string,
    template: string,
    path: string
};

export function templates(type: string) {
    if (type == 'two') {
        return [
            {
               name: 'empty',
               description: 'A empty template',
               icon: '/templates/two/empty.png',
               path: '/templates/two/empty/'
           }   
           ];
    } else if (type == 'three') {
        return [
         {
            name: 'empty',
            description: 'A empty template',
            icon: '/templates/three/empty.png',
            path: '/templates/three/empty/'
        }  
        ];
    } else if (type == 'tilemap') {
        return [
            {
               name: 'empty',
               description: 'A empty template',
               icon: '/templates/tilemap/empty.png',
               path: '/templates/tilemap/empty/'
           }
           ];
    }
    return [];
}