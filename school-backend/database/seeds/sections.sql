INSERT INTO sections(class_id,name) SELECT id,'A' FROM classes WHERE NOT EXISTS (SELECT 1 FROM sections s WHERE s.class_id=classes.id AND s.name='A');
