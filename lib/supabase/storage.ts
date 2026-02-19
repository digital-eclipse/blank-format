import { createAdminSupabaseClient } from './adminServer';

export async function uploadFileToStorage(
  bucket: string,
  file: File,
  filename: string
) {
  const adminClient = await createAdminSupabaseClient();
    
  const { data, error } = await adminClient.storage
    .from(bucket)
    .upload(filename, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    console.error(`[Storage] Upload error for ${filename}:`, error);
    throw error;
  }

  const { data: { publicUrl } } = adminClient.storage
    .from(bucket)
    .getPublicUrl(filename);

  return {
    path: data.path,
    publicUrl
  };
}

export async function deleteFileFromStorage(
  bucket: string,
  fileUrl: string
) {
  const adminClient = await createAdminSupabaseClient();
  
  try {
    // Get the full path after the bucket name
    const url = new URL(fileUrl);
    const fullPath = decodeURIComponent(url.pathname.split(`${bucket}/`)[1]);
    
    if (!fullPath) {
      throw new Error('Could not determine storage path from URL');
    }

    const { error: deleteError } = await adminClient.storage
      .from(bucket)
      .remove([fullPath]);
    
    if (deleteError) {
      console.error('Error deleting file:', deleteError);
      console.error('Delete error details:', JSON.stringify(deleteError, null, 2));
      throw deleteError;
    }

    return true;
  } catch (error) {
    console.error('Error in file deletion process:', error);
    console.error('Delete error details:', JSON.stringify(error, null, 2));
    throw error;
  }
} 