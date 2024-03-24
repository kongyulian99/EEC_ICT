import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { ResponseData } from '../models';
import { slugify } from '../utilities';
import { SystemConstants } from '../constants';

@Injectable({
    providedIn: 'root'
})
export class FileService extends BaseService {
    private httpOptions = new HttpHeaders();

    constructor(private http: HttpClient) {
        super();
        this.httpOptions.append('Content-Type', 'multipart/form-data');
        this.httpOptions.append('Accept', 'application/json');
    }
    upload(files: any[], fileType: string, folder: string,nameUniques?:string[])
    {
        // if (files.length === 0)
        // {
        //     return;
        // }
        const formData = new FormData();
        files.forEach((file:any, index: number) =>
        {
            let nameunique: string ='';
            if(!nameUniques||(nameUniques.length>0&&!nameUniques[index])){
                nameunique = slugify(file.name, '_');
                // console.log(file.name)
            } else {
                nameunique = nameUniques[index];
            }
            formData.append('files[]', file, nameunique);
        });

        return this.http.post<any>(`${SystemConstants.API_URL}/api/files/upload?fileType=${ fileType }&folder=${ folder }`,
            formData, { reportProgress: true, observe: 'events' });
    }

    uploadChunk(formData, folder) {
        return this.http.post<any>(`${SystemConstants.API_URL}/api/files/uploadchunk?folder=${folder}`,
            formData);
    }

    uploadTCSP(files: any[], fileType: string, folder: string, fileName: string, nameUniques?: string)
    {
        // if (files.length === 0)
        // {
        //     return;
        // }
        const formData = new FormData();
        files.forEach((file:any, index: number) =>
        {
            let nameunique: string ='';
            if(!nameUniques||(nameUniques.length>0&&!nameUniques[index])){
                nameunique = slugify(file.name, '_');
                // console.log(file.name)
            } else {
                nameunique = nameUniques[index];
            }
            formData.append('files[]', file, nameunique);
        });

        return this.http.post<ResponseData>(`${SystemConstants.API_URL}/api/files/upload-tcsp?fileType=${ fileType }&folder=${ folder }&fileName=${ fileName }`,
            formData, { reportProgress: true, observe: 'events' });
    }

    uploadImageWThumbnail(files: any[],folder: string,nameUniques?:string[])
    {
        // if (files.length === 0)
        // {
        //     return;
        // }
        const formData = new FormData();
        files.forEach((file:any, index: number) =>
        {
            let nameunique: string ='';
            if(!nameUniques||(nameUniques.length>0&&!nameUniques[index])){
                nameunique = slugify(file.name, '_');
                // console.log(file.name)
            } else {
                nameunique = nameUniques[index];
            }
            formData.append('files[]', file, nameunique);
        });

        return this.http.post<any>(`${SystemConstants.API_URL}/api/files/uploadimageswthumbnail?folder=${ folder }`,
            formData, { reportProgress: true, observe: 'events' });
    }
    uploadVideo(video: any, image: any) {
        const formData = new FormData();
        formData.append('files[]', video, slugify(video.name, '_'));
        formData.append('files[]', image, slugify(image.name, '_'));

        return this.http.post<any>(`${SystemConstants.API_URL}/api/files/uploadvideo`,
            formData, { reportProgress: true, observe: 'events' });
    }
    delete(fileName: string, folder) {
        return this.http.delete<ResponseData>(`${SystemConstants.API_URL}/api/files/delete?folder=${folder}&fileName=${fileName}`);
    }

    deleteByName(fileName: string, folder: string)
    {
        return this.http.post<ResponseData>(`${SystemConstants.API_URL}/api/files/delete?fileName=${ fileName }&folder=${ folder }`, {});
    }

    download(path: string, file: string): Observable<Blob> {
        return this.http.get(`${SystemConstants.API_URL}/api/files/download?path=${path}&file=${file}`,
            { responseType: 'blob'});
    }

    downloadReport(file: string): Observable<Blob> {
        return this.http.get(`${SystemConstants.API_URL}/api/files/downloadreport?fileName=${file}`,
            { responseType: 'blob'});
    }


    downloadDocument(fileName: string, folder: string): Observable<Blob>
    {
        return this.http.get(`${SystemConstants.API_URL}/api/files/downloaddocument?fileName=${ fileName }&folder=${ folder }`,
            { responseType: 'blob' });
    }
}
