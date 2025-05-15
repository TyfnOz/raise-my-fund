'use client';
import { useState } from 'react';
import { SubmitButton } from '@/components/form/Buttons';
import FormContainer from '@/components/form/FormContainer';
import { Card } from '@/components/ui/card';
import TextAreaInput from '@/components/form/TextAreaInput';
import { Button } from '@/components/ui/button';
import { createCommentAction } from '@/utils/actions';
function SubmitComment({campaignId}:{campaignId:string}) {
  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);
  return (
    <div className='mt-8'>
      <Button className='cursor-pointer' onClick={() => setIsCommentFormVisible((prev) => !prev)} >
        Leave a Comment
      </Button>
      {
        isCommentFormVisible 
        && <Card className='p-8 mt-8'>
          <FormContainer action={createCommentAction}>
            <input type="hidden" name="campaignId" value={campaignId}/>
            <TextAreaInput name='comment' labelText='Your supportive comments...' 
              defaultValue='...'/>
              <SubmitButton text='Submit' className='mt-4' />
          </FormContainer>
        </Card>
        }
    </div>
  )
}

export default SubmitComment;