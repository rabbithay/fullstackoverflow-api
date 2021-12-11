CREATE TABLE "questions" (
	"question_id" serial NOT NULL,
	"question_text" TEXT NOT NULL,
	"question_tags" TEXT,
	"created_by_student" TEXT NOT NULL,
	"created_by_class" TEXT NOT NULL,
	"created_at" timestamp with time zone NOT NULL DEFAULT 'NOW()',
	"answered" BOOLEAN NOT NULL DEFAULT 'false',
	"question_score" integer NOT NULL DEFAULT '1',
	CONSTRAINT "questions_pk" PRIMARY KEY ("question_id")
);

CREATE TABLE "users" (
	"user_id" serial NOT NULL,
	"user_name" TEXT NOT NULL,
	"user_class" TEXT NOT NULL,
	"token" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("user_id")
);

CREATE TABLE "answers" (
	"answer_id" serial NOT NULL,
	"question_id" integer NOT NULL,
	"answer_text" TEXT NOT NULL,
	"created_by" integer NOT NULL,
	"created_at" timestamp with time zone NOT NULL DEFAULT 'NOW()',
	CONSTRAINT "answers_pk" PRIMARY KEY ("answer_id")
);

ALTER TABLE "questions" ADD CONSTRAINT "questions_fk0" FOREIGN KEY ("created_by") REFERENCES "users"("user_id");

ALTER TABLE "answers" ADD CONSTRAINT "answers_fk0" FOREIGN KEY ("question_id") REFERENCES "questions"("question_id");
ALTER TABLE "answers" ADD CONSTRAINT "answers_fk1" FOREIGN KEY ("created_by") REFERENCES "users"("user_id");




